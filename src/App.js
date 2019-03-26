import React, { useState } from 'react'
import nanoid from 'nanoid'
import faker from 'faker'
import { times } from 'ramda'

function newLine() {
  return { id: `id_${nanoid()}`, title: faker.name.lastName() }
}

function App() {
  const [state, setState] = useState(()=>{
    return {
      lines:times(newLine, 10)
    }
  })
  return (
    <div className="code">
      {state.lines.map(line=>{

        return <div key={line.id} className="lh-copy ph3">
          {line.title}
        </div>
      })}

    </div>
  )
}

export default App;
