import { SELECT_LINE, SELECT_NEXT_LINE, SELECT_PREV_LINE } from './actions'

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

export function rootReducer(state, action) {
  // console.log(`state,action`, state, action)
  const payload = action.payload
  switch (action.type) {
    case SELECT_LINE:
      return { ...state, selectedId: payload.line.id }
    case SELECT_NEXT_LINE:
      return sNext(state)
    case SELECT_PREV_LINE:
      return sPrev(state)
    default :
      console.error('Unknown action.type', action.type)
  }
  return state
}
