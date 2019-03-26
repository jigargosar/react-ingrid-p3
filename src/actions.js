export const SELECT_LINE = 'sl'

export function selectLineAction(line, dispatch) {
  dispatch({ type: SELECT_LINE, line })
}

export function selectNextAction(dispatch) {
  dispatch({ type: 'sNext' })
}

export function selectPrevAction(dispatch) {
  dispatch({ type: 'sPrev' })
}
