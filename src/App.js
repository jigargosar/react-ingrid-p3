import React, { useEffect, useState } from 'react'
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

function App() {

  const [state, setState] = useState(() => cachedState() || initialState())

  useEffect(() => {
    localStorage.setItem('react-ingrid-p3', JSON.stringify(state))
  }, [state])

  return (
    <div className="min-vh-100 pv3 ph2">
      <div className="code">
        {state.lines.map(line => {
          const isSelected = line.id === state.selectedId

          let cc = `${isSelected ? 'bg-blue white' : ''}`

          return <div key={line.id} className={`lh-copy ph3 br2 ${cc}`}
                      tabIndex={0}
                      onFocus={() => setState(s => {
                        return { ...s, selectedId: line.id }
                      })}
          >
            {line.title}
          </div>
        })}

      </div>
    </div>
  )
}

export default App
