import { SELECT_LINE, SELECT_NEXT_LINE, SELECT_PREV_LINE } from './actions'
import nanoid from 'nanoid'
import faker from 'faker'
import {
  complement,
  equals,
  lensPath,
  omit,
  over,
  prepend,
  times,
} from 'ramda'

function sNext(state) {
  const idx = state.lines.findIndex(l => l.id === state.selectedId)
  if (idx > -1) {
    const newIdx = idx + 1
    if (newIdx >= 0 && newIdx < state.lines.length) {
      const newSelectedId = state.lines[newIdx].id
      return { ...state, selectedId: newSelectedId }
    }
  }
  return state
}

function sPrev(state) {
  const idx = state.lines.findIndex(l => l.id === state.selectedId)
  if (idx > -1) {
    const newIdx = idx - 1
    if (newIdx >= 0 && newIdx < state.lines.length) {
      const newSelectedId = state.lines[newIdx].id
      return { ...state, selectedId: newSelectedId }
    }
  }
  return state
}

const initialHistoryState = { undoStack: [], redoStack: [] }

const historyEnhancer = reducer => {
  const omitHistory = omit(['history'])
  const notEquals = complement(equals)
  const overHistory = over(lensPath(['history']))
  return (oldState, action) => {
    const newState = reducer(oldState, action)

    const newStateWithoutHistory = omitHistory(newState)
    if (notEquals(omitHistory(oldState), newStateWithoutHistory)) {
      return overHistory(
        ({ undoStack, redoStack } = initialHistoryState) => {
          return {
            undoStack: prepend(newStateWithoutHistory, undoStack),
            redoStack: [],
          }
        },
      )
    }

    return newState
  }
}

export const rootReducer = historyEnhancer(reducer)

export function reducer(state, action) {
  // console.log(`state,action`, state, action)
  const payload = action.payload
  switch (action.type) {
    case SELECT_LINE:
      return { ...state, selectedId: payload.line.id }
    case SELECT_NEXT_LINE:
      return sNext(state)
    case SELECT_PREV_LINE:
      return sPrev(state)
    default:
      console.error('Unknown action.type', action.type)
  }
  return state
}

function newLine() {
  return { id: `id_${nanoid()}`, title: faker.name.lastName() }
}

export function initialState() {
  let lines = times(newLine, 10)
  return {
    lines,
    selectedId: lines[0].id,
    history: initialHistoryState,
  }
}
