import React, { useEffect, useLayoutEffect, useReducer, useRef } from 'react'
import isHotkey from 'is-hotkey'
import { initialState, rootReducer } from './rootReducer'
import { selectLineAction, selectNextAction, selectPrevAction } from './actions'
import { reduce, reduced } from 'ramda'

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

function findHotKeyHandler(e, km) {
  return reduce((handler, key) => {
    if (isHotkey(key, e)) {
      return reduced(handler)
    }
  })(km)
}

function App() {

  const [state, dispatch] = useReducer(rootReducer, null, () => cachedState() || initialState())

  useEffect(() => {
    window.addEventListener('keydown', e => {

      const km = { up: selectPrevAction, down: selectNextAction }

      const action = findHotKeyHandler(e, km)
      if (action) {
        e.preventDefault()
        dispatch(action)
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
