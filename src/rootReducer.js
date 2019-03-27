import {
  NEW_LINE,
  REDO,
  SELECT_LINE,
  SELECT_NEXT_LINE,
  SELECT_PREV_LINE,
  UNDO,
} from './actions'
import nanoid from 'nanoid'
import faker from 'faker'
import { assocPath, compose, insert, lensPath, over, times } from 'ramda'
import {
  initialHistoryState,
  redo,
  reducerEnhancer,
  undo,
} from './undoManager'

function createLine() {
  return { id: `id_${nanoid()}`, title: faker.name.lastName() }
}

export function initialState() {
  let lines = times(createLine, 10)
  return {
    lines,
    selectedId: lines[0].id,
    history: initialHistoryState,
  }
}

function selectNextLine(state) {
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

function _selectedLineIndex(state) {
  const { lines, selectedId } = state
  const idx = lines.findIndex(l => l.id === selectedId)
  return idx
}

function selectPreviousLine(state) {
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

const overLines = over(lensPath(['lines']))
const assocSelectedId = assocPath(['selectedId'])

function addNewLineAfterSelected(state) {
  const idx = _selectedLineIndex(state)

  if (idx >= 0) {
    const newLine = createLine()
    return compose(
      assocSelectedId(newLine.id),
      overLines(insert(idx + 1, newLine)),
    )(state)
  }
}

export const rootReducer = reducerEnhancer(reducer)

export function reducer(state, action) {
  // console.log(`state,action`, state, action)
  const payload = action.payload
  switch (action.type) {
    case NEW_LINE:
      return addNewLineAfterSelected(state)
    case SELECT_LINE:
      return { ...state, selectedId: payload.line.id }
    case SELECT_NEXT_LINE:
      return selectNextLine(state)
    case SELECT_PREV_LINE:
      return selectPreviousLine(state)
    case UNDO:
      return undo(state)
    case REDO:
      return redo(state)
    default:
      console.error('Unknown action.type', action.type)
  }
  return state
}
