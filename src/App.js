import React, { useEffect, useLayoutEffect, useReducer, useRef } from 'react'
import nanoid from 'nanoid'
import faker from 'faker'
import { times } from 'ramda'
import isHotkey from 'is-hotkey'

function newLine() {
  return { id: `id_${nanoid()}`, title: faker.name.lastName() }
}

function initialState() {
  let lines = times(newLine, 10)
  return {
    lines,
    selectedId: lines[0].id,
  }
}

function cachedState() {
  const jsonString = localStorage.getItem('react-ingrid-p3')
  if (jsonString) {
    return JSON.parse(jsonString)
  }
  return null
}

function selectLineAction(line, dispatch) {
  dispatch({ type: 'sl', line })
}

function selectNextAction(dispatch) {
  dispatch({ type: 'sNext' })
}

function selectPrevAction(dispatch) {
  dispatch({ type: 'sPrev' })
}

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

function rootReducer(state, action) {
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

function Line({ line, isSelected, dispatch }) {

  let sc = `${isSelected ? 'bg-blue white' : ''}`
  const ref = useRef()

  useLayoutEffect(() => {
    const el = ref.current
    if (isSelected && el) {
      el.focus()
    }
  }, [isSelected])

  return <div ref={ref} key={line.id} className={`lh-copy ph3 br2 ${sc}`}
              tabIndex={0}
              onFocus={() => selectLineAction(line, dispatch)}
  >
    {line.title}
  </div>
}

function App() {

  const [state, dispatch] = useReducer(rootReducer, null, () => cachedState() || initialState())

  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (isHotkey('up', e)) {
        selectPrevAction(dispatch)
      } else if (isHotkey('down', e)) {
        selectNextAction(dispatch)
      }
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('react-ingrid-p3', JSON.stringify(state))
  }, [state])

  return (
    <div className="min-vh-100 pv3 ph2">
      <div className="code">
        {state.lines.map(line => {
          const isSelected = line.id === state.selectedId

          return <Line key={line.id} line={line} isSelected={isSelected} dispatch={dispatch}
          />
        })}

      </div>
    </div>
  )
}

export default App
