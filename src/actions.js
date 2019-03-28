export const NEW_LINE = Symbol('NEW_LINE')
export const DELETE_SELECTED_LINE = Symbol('DELETE_SELECTED_LINE')
export const EDIT_SELECTED_LINE = Symbol('EDIT_SELECTED_LINE')
export const STOP_EDIT_SELECTED_LINE = Symbol('STOP_EDIT_SELECTED_LINE')
export const SET_EDITING_LINE_CONTENT = Symbol('SET_EDITING_LINE_CONTENT')
export const SELECT_LINE = Symbol('SELECT_LINE')
export const SELECT_NEXT_LINE = Symbol('SELECT_NEXT_LINE')
export const SELECT_PREV_LINE = Symbol('SELECT_PREV_LINE')
export const UNDO = Symbol('UNDO')
export const REDO = Symbol('REDO')

export const SET_POUCH_HISTORY_CONNECTED = Symbol(
  'SET_POUCH_HISTORY_CONNECTED',
)

export const SET_POUCH_HISTORY_CONNECTING = Symbol(
  'SET_POUCH_HISTORY_CONNECTING',
)

export const SET_POUCH_HISTORY_CONNECTION_ERROR = Symbol(
  'SET_POUCH_HISTORY_CONNECTION_ERROR',
)

export function selectLineAction(line, dispatch) {
  dispatch({ type: SELECT_LINE, payload: { line } })
}

export function selectNextAction(dispatch) {
  dispatch({ type: SELECT_NEXT_LINE })
}

export function selectPrevAction(dispatch) {
  dispatch({ type: SELECT_PREV_LINE })
}

export function undoAction(dispatch) {
  dispatch({ type: UNDO })
}

export function redoAction(dispatch) {
  dispatch({ type: REDO })
}

export function newLineAction(dispatch) {
  dispatch({ type: NEW_LINE })
}

export function deleteSelectedLineAction(dispatch) {
  dispatch({ type: DELETE_SELECTED_LINE })
}

export function editSelectedLineAction(dispatch) {
  dispatch({ type: EDIT_SELECTED_LINE })
}

export function stopEditSelectedLineAction(dispatch) {
  dispatch({ type: STOP_EDIT_SELECTED_LINE })
}

export function setEditingLineTitleAction(dispatch, title) {
  dispatch({ type: SET_EDITING_LINE_CONTENT, payload: { title } })
}

export function pouchHistoryDbConnectingAction(dispatch) {
  dispatch({ type: SET_POUCH_HISTORY_CONNECTING })
}

export function pouchHistoryDbConnectedAction(dispatch, info) {
  dispatch({ type: SET_POUCH_HISTORY_CONNECTED, payload: { info } })
}

export function pouchHistoryDbConnectionErrorAction(dispatch, error) {
  dispatch({
    type: SET_POUCH_HISTORY_CONNECTION_ERROR,
    payload: { error },
  })
}
