import React, { useState } from 'react'
import nanoid from 'nanoid'
import faker from 'faker'
import { times } from 'ramda'

function newLine() {
  return { id: `id_${nanoid()}`, title: faker.name.lastName() }
}

function App() {
  const [state, setState] = useState(()=>{
    let lines = times(newLine, 10)
    return {
      lines,
      selectedId:lines[0].id
    }
  })
  return (
    <div className="min-vh-100 pv3 ph2">
      <div className="code">
        {state.lines.map(line => {
          const isSelected = line.id === state.selectedId

          let cc = `${isSelected ? "bg-blue white" : ""}`

          return <div key={line.id} className={`lh-copy ph3 br2 ${cc}`}>
            {line.title}
          </div>
        })}

      </div>
    </div>
  )
}

export default App;
