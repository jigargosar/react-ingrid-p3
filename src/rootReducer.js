import {
  REDO,
  SELECT_LINE,
  SELECT_NEXT_LINE,
  SELECT_PREV_LINE,
  UNDO,
} from './actions'
import nanoid from 'nanoid'
import faker from 'faker'
import {
  assoc,
  complement,
  equals,
  head,
  lensPath,
  omit,
  over,
  prepend,
  tail,
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

function undo(state) {
  const { history, ...stateWithoutHistory } = state
  const { undoStack, redoStack } = history
  const lastState = head(undoStack)
  if (lastState) {
    const newHistory = {
      undoStack: tail(undoStack),
      redoStack: prepend(stateWithoutHistory, redoStack),
    }
    return assoc('history', newHistory)(state)
  }
  return state
}

function redo(state) {
  const { history, ...stateWithoutHistory } = state
  const { undoStack, redoStack } = history
  const lastState = head(undoStack)
  if (lastState) {
    const newHistory = {
      undoStack: tail(undoStack),
      redoStack: prepend(stateWithoutHistory, redoStack),
    }
    return assoc('history', newHistory)(state)
  }
  return state
}

const historyEnhancer = reducer => {
  const overHistory = over(lensPath(['history']))
  const omitHistory = omit(['history'])
  const notEquals = complement(equals)
  return (oldState, action) => {
    const newState = reducer(oldState, action)

    const newStateWithoutHistory = omitHistory(newState)
    if (notEquals(omitHistory(oldState), newStateWithoutHistory)) {
      return overHistory(({ undoStack } = initialHistoryState) => {
        return {
          undoStack: prepend(newStateWithoutHistory, undoStack),
          redoStack: [],
        }
      })(newState)
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
    case UNDO:
      return undo(state)
    case REDO:
      return redo(state)
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
