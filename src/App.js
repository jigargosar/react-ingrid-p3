import React, { useReducer } from 'react'
import { initialState, rootReducer } from './rootReducer'
import {
  deleteSelectedLineAction,
  editSelectedLineAction,
  newLineAction,
  redoAction,
  selectNextAction,
  selectPrevAction,
  stopEditSelectedLineAction,
  undoAction,
} from './actions'
import { useHotKeyDispatcher } from './hooks/useHotKey'
import {
  localStorageGetAndMerge,
  useLocalStorageSet,
} from './hooks/useLocalStorageSet'
import { LineList } from './components/LineList'

function currentHotKeyMap(isEditingSelected) {
  const keyMap = {
    up: selectPrevAction,
    down: selectNextAction,
    'meta+z': undoAction,
    'meta+shift+z': redoAction,
    enter: newLineAction,
    delete: deleteSelectedLineAction,
    space: editSelectedLineAction,
  }
  const editKeyMap = {
    esc: stopEditSelectedLineAction,
    enter: newLineAction,
  }

  return isEditingSelected ? editKeyMap : keyMap
}

function useStartApp() {
  const cacheKey = 'react-ingrid-p3'
  const [state, dispatch] = useReducer(
    rootReducer,
    localStorageGetAndMerge('react-ingrid-p3', initialState()),
  )

  useLocalStorageSet(cacheKey, state)

  useHotKeyDispatcher(currentHotKeyMap(state.isEditingSelected), dispatch)
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
