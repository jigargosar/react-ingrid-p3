import React, { useLayoutEffect, useReducer, useRef } from 'react'
import { initialState, rootReducer } from './rootReducer'
import { selectLineAction, selectNextAction, selectPrevAction } from './actions'
import { useHotKeyDispatcher } from './hooks/useHotKey'
import { getCached, useCacheEffect } from './hooks/useCacheEffect'

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

  const cacheKey = 'react-ingrid-p3'
  const [state, dispatch] = useReducer(rootReducer, null, () => getCached(cacheKey) || initialState())
  useCacheEffect(cacheKey, state)

  const currentHotKeyMap = () => ({ up: selectPrevAction, down: selectNextAction })

  useHotKeyDispatcher(currentHotKeyMap, dispatch)

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
