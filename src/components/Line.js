import React, { useLayoutEffect, useRef } from 'react'
import { selectLineAction } from '../actions'

export function Line({ line, isSelected, dispatch }) {
  const sc = `${isSelected ? 'bg-blue white' : ''}`
  const ref = useRef()

  useLayoutEffect(() => {
    const el = ref.current
    if (isSelected && el) {
      el.focus()
    }
  }, [isSelected])

  return (
    <div
      ref={ref}
      key={line.id}
      className={`lh-copy ph3 br2 ${sc}`}
      tabIndex={0}
      onFocus={() => selectLineAction(line, dispatch)}
    >
      {line.title}
    </div>
  )
}
