import React, { useEffect, useReducer } from 'react'
import nanoid from 'nanoid'
import faker from 'faker'
import { times } from 'ramda'

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
  dispatch({ action: 'sl', line })
}

function rootReducer(state, action) {
  console.log(`state,action`, state, action)
  switch (action.type) {
    case 'sl':
      break
    default :
      console.error('Unknown action.type', action.type)
  }
  return state
}


function Line({ line, isSelected, dispatch }) {

  let sc = `${isSelected ? 'bg-blue white' : ''}`

  return <div key={line.id} className={`lh-copy ph3 br2 ${sc}`}
              tabIndex={0}
              onFocus={() => selectLineAction(line , dispatch)}
  >
    {line.title}
  </div>
}

function App() {

  const [state, dispatch] = useReducer(rootReducer, null, () => cachedState() || initialState())


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
