import { Line } from './Line'
import React from 'react'

export function LineList({ state, dispatch }) {
  return state.lines.map(line => {
    const isSelected = line.id === state.selectedId

    return (
      <Line
        key={line.id}
        line={line}
        isSelected={isSelected}
        dispatch={dispatch}
      />
    )
  })
}
