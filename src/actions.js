export const NEW_LINE = Symbol('NEW_LINE')
export const DELETE_SELECTED_LINE = Symbol('DELETE_SELECTED_LINE')
export const EDIT_SELECTED_LINE = Symbol('EDIT_SELECTED_LINE')
export const SET_EDITING_LINE_CONTENT = Symbol('SET_EDITING_LINE_CONTENT')
export const SELECT_LINE = Symbol('SELECT_LINE')
export const SELECT_NEXT_LINE = Symbol('SELECT_NEXT_LINE')
export const SELECT_PREV_LINE = Symbol('SELECT_PREV_LINE')
export const UNDO = Symbol('UNDO')
export const REDO = Symbol('REDO')

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

export function setEditingLineTitleAction(dispatch, title) {
  dispatch({ type: SET_EDITING_LINE_CONTENT, payload: { title } })
}
