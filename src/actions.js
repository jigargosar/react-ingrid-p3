export const SELECT_LINE = 'sl'
export const SELECT_NEXT_LINE = 'sNext'
export const SELECT_PREV_LINE = 'sPrev'

export function selectLineAction(line, dispatch) {
  dispatch({ type: SELECT_LINE, line })
}

export function selectNextAction(dispatch) {
  dispatch({ type: SELECT_NEXT_LINE })
}

export function selectPrevAction(dispatch) {
  dispatch({ type: SELECT_PREV_LINE })
}
