import React, { useEffect, useLayoutEffect, useReducer, useRef } from 'react'
import nanoid from 'nanoid'
import faker from 'faker'
import { times } from 'ramda'
import isHotkey from 'is-hotkey'
import { rootReducer } from './rootReducer'
import { selectLineAction, selectNextAction, selectPrevAction } from './actions'

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
