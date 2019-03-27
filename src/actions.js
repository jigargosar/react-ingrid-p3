export const SELECT_LINE = 'SELECT_LINE'
export const SELECT_NEXT_LINE = 'SELECT_NEXT_LINE'
export const SELECT_PREV_LINE = 'SELECT_PREV_LINE'
export const UNDO = 'UNDO'
export const REDO = 'REDO'

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
