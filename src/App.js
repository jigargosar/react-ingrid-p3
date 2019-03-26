import React, { useReducer } from 'react'
import { initialState, rootReducer } from './rootReducer'
import { selectNextAction, selectPrevAction } from './actions'
import { useHotKeyDispatcher } from './hooks/useHotKey'
import { getCached, useCacheEffect } from './hooks/useCacheEffect'
import { LineList } from './components/LineList'

function useRootState() {
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
  return [state, dispatch]
}

function App() {
  const [state, dispatch] = useRootState()

  return (
    <div className="min-vh-100 pv3 ph2">
      <div className="code">
        <LineList state={state} dispatch={dispatch} />
      </div>
    </div>
  )
}

export default App
