import {
  DELETE_SELECTED_LINE,
  EDIT_SELECTED_LINE,
  NEW_LINE,
  REDO,
  SELECT_LINE,
  SELECT_NEXT_LINE,
  SELECT_PREV_LINE,
  SET_EDITING_LINE_CONTENT,
  SET_POUCH_HISTORY_CONNECTED,
  SET_POUCH_HISTORY_CONNECTING,
  SET_POUCH_HISTORY_CONNECTION_ERROR,
  STOP_EDIT_SELECTED_LINE,
  UNDO,
} from './actions'
import nanoid from 'nanoid'
import faker from 'faker'
import {
  assoc,
  assocPath,
  compose,
  insert,
  lensPath,
  over,
  remove,
  times,
} from 'ramda'
import {
  initialUndoManagerState,
  redo,
  reducerEnhancer,
  undo,
} from './undoManager'
import {
  initialPouchHistoryState,
  setPouchHistoryConnected,
  setPouchHistoryConnecting,
  setPouchHistoryConnectionError,
} from './pouchHistoryManager'

function createLine() {
  return { id: `id_${nanoid()}`, title: faker.name.lastName() }
}

export function initialState() {
  let lines = times(createLine, 10)
  return {
    lines,
    selectedId: lines[0].id,
    isEditingSelected: false,
    undoManager: initialUndoManagerState,
    pouchHistory: initialPouchHistoryState,
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
  return lines.findIndex(l => l.id === selectedId)
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

function deleteSelectedLine(state) {
  if (state.lines.length === 1) {
    return state
  }

  const idx = _selectedLineIndex(state)
  const nextSelectedIdx =
    idx === state.lines.length - 1 ? idx - 1 : idx + 1
  const nextSelectedId = state.lines[nextSelectedIdx].id

  if (idx >= 0) {
    return compose(
      assocSelectedId(nextSelectedId),
      overLines(remove(idx, 1)),
    )(state)
  }
  return state
}

function setEditingLineTitle(title, state) {
  const idx = _selectedLineIndex(state)

  if (idx > -1) {
    return compose(
      //
      assocPath(['lines', idx, 'title'], title),
    )(state)
  }

  return state
}

function reducer(state, action) {
  // console.log(`state,action`, state, action)
  // console.count('action')
  const payload = action.payload
  switch (action.type) {
    case NEW_LINE:
      return addNewLineAfterSelected(state)
    case DELETE_SELECTED_LINE:
      return deleteSelectedLine(state)
    case EDIT_SELECTED_LINE:
      return assoc('isEditingSelected', true)(state)
    case STOP_EDIT_SELECTED_LINE:
      return assoc('isEditingSelected', false)(state)
    case SET_EDITING_LINE_CONTENT:
      return setEditingLineTitle(payload.title, state)
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
    case SET_POUCH_HISTORY_CONNECTING:
      return setPouchHistoryConnecting(state)
    case SET_POUCH_HISTORY_CONNECTED:
      return setPouchHistoryConnected(state)
    case SET_POUCH_HISTORY_CONNECTION_ERROR:
      return setPouchHistoryConnectionError(state)
    default:
      console.error('Unknown action.type', action.type)
  }
  return state
}

export const rootReducer = reducerEnhancer(reducer)
