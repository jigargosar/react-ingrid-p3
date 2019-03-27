import React, { useLayoutEffect, useRef } from 'react'
import { selectLineAction, setEditingLineTitleAction } from '../actions'

export function Line({ line, isSelected, isEditing, dispatch }) {
  const sc = `${isSelected ? 'bg-blue white' : ''}`
  const ref = useRef()
  const onFocusHandler = () => selectLineAction(line, dispatch)

  useLayoutEffect(() => {
    const el = ref.current
    if (isSelected && el) {
      el.focus()
    }
  }, [isSelected])

  return (
    <>
      {isEditing ? (
        <input
          ref={ref}
          className={`lh-copy ph3 br2 ${sc}`}
          onFocus={onFocusHandler}
          value={line.title}
          onChange={e =>
            setEditingLineTitleAction(dispatch, e.target.value)
          }
        />
      ) : (
        <div
          ref={ref}
          className={`lh-copy ph3 br2 ${sc}`}
          tabIndex={0}
          onFocus={onFocusHandler}
        >
          {line.title}
        </div>
      )}
    </>
  )
}
