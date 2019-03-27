import React, { useReducer } from 'react'
import { initialState, rootReducer } from './rootReducer'
import {
  deleteSelectedLineAction,
  newLineAction,
  redoAction,
  selectNextAction,
  selectPrevAction,
  undoAction,
} from './actions'
import { useHotKeyDispatcher } from './hooks/useHotKey'
import {
  localStorageGetAndMerge,
  usePersistToLocalStorage,
} from './hooks/usePersistToLocalStorage'
import { LineList } from './components/LineList'

function useStartApp() {
  const cacheKey = 'react-ingrid-p3'
  const [state, dispatch] = useReducer(
    rootReducer,
    localStorageGetAndMerge('react-ingrid-p3', initialState()),
  )

  usePersistToLocalStorage(cacheKey, state)

  const currentHotKeyMap = () => ({
    up: selectPrevAction,
    down: selectNextAction,
    'meta+z': undoAction,
    'meta+shift+z': redoAction,
    enter: newLineAction,
    delete: deleteSelectedLineAction,
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
