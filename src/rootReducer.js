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
  switch (action.type) {
    case 'sl':
      return { ...state, selectedId: action.line.id }
    case 'sNext':
      return sNext(state)
    case 'sPrev':
      return sPrev(state)
    default :
      console.error('Unknown action.type', action.type)
  }
  return state
}
