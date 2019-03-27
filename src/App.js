import React, { useEffect, useReducer } from 'react'
import { initialState, rootReducer } from './rootReducer'
import {
  deleteSelectedLineAction,
  editSelectedLineAction,
  newLineAction,
  pouchHistoryDbConnectedAction,
  pouchHistoryDbConnectionErrorAction,
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
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { pouchHistoryDB } from './pouchHistoryManager'

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
  const [state, dispatch] = useReducer(rootReducer, null, () =>
    localStorageGetAndMerge('react-ingrid-p3', initialState()),
  )

  useLocalStorageSet(cacheKey, state)

  useHotKeyDispatcher(currentHotKeyMap(state.isEditingSelected), dispatch)
  return [state, dispatch]
}

function App() {
  const [state, dispatch] = useStartApp()

  useEffect(() => {
    pouchHistoryDB
      .info()
      .then(info => {
        console.debug(info)
        pouchHistoryDbConnectedAction(dispatch, info)
        toast(`Connected to ${info.db_name}`)
      })
      .catch(e => {
        console.error(e)
        pouchHistoryDbConnectionErrorAction(dispatch, e)
        toast('Error connecting to Local Couch History')
      })
  }, [])

  return (
    <div className="min-vh-100 pv3 ph2">
      <div>
        <button onClick={() => toast('Boom!')}>toast</button>
      </div>
      <div className="code">
        <LineList state={state} dispatch={dispatch} />
      </div>
    </div>
  )
}

export default App
