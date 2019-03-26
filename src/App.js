import React, { useReducer } from 'react'
import { initialState, rootReducer } from './rootReducer'
import { selectNextAction, selectPrevAction } from './actions'
import { useHotKeyDispatcher } from './hooks/useHotKey'
import { getCached, useCacheEffect } from './hooks/useCacheEffect'
import { Line } from './components/Line'

function LineList({ state, dispatch }) {
  return state.lines.map(line => {
    const isSelected = line.id === state.selectedId

    return (
      <Line
        key={line.id}
        line={line}
        isSelected={isSelected}
        dispatch={dispatch}
      />
    )
  })
}

function App() {
  const cacheKey = 'react-ingrid-p3'
  const [state, dispatch] = useReducer(
    rootReducer,
    null,
    () => getCached(cacheKey) || initialState(),
  )
  useCacheEffect(cacheKey, state)

  const currentHotKeyMap = () => ({
    up: selectPrevAction,
    down: selectNextAction,
  })

  useHotKeyDispatcher(currentHotKeyMap, dispatch)

  return (
    <div className="min-vh-100 pv3 ph2">
      <div className="code">
        <LineList state={state} dispatch={dispatch} />
      </div>
    </div>
  )
}

export default App
