import React, { useReducer } from 'react'
import { initialState, rootReducer } from './rootReducer'
import {
  newLineAction,
  redoAction,
  selectNextAction,
  selectPrevAction,
  undoAction,
} from './actions'
import { useHotKeyDispatcher } from './hooks/useHotKey'
import { getCached, useCacheEffect } from './hooks/useCacheEffect'
import { LineList } from './components/LineList'

function useStartApp() {
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
    'meta+z': undoAction,
    'meta+shift+z': redoAction,
    enter: newLineAction,
    delete: deleteSelectedLineAction(),
  })

  useHotKeyDispatcher(currentHotKeyMap, dispatch)
  return [state, dispatch]
}

function App() {
  const [state, dispatch] = useStartApp()

  return (
    <div className="min-vh-100 pv3 ph2">
      <div className="code">
        <LineList state={state} dispatch={dispatch} />
      </div>
    </div>
  )
}

export default App
