import React, { useLayoutEffect, useRef } from 'react'
import {
  selectLineAction,
  setEditingLineTitleAction,
  stopEditSelectedLineAction,
} from '../actions'

export function Line({ line, isSelected, isEditing, dispatch }) {
  const sc = `${isSelected ? 'bg-blue white' : ''}`
  const ref = useRef()
  const onFocusHandler = () => selectLineAction(line, dispatch)
  const onTitleClickHandler = () => selectLineAction(line, dispatch)

  useLayoutEffect(() => {
    const el = ref.current
    if (isSelected && el) {
      el.focus()
    }
  }, [isSelected, isEditing])

  return (
    <div className="flex">
      {isEditing ? (
        <input
          ref={ref}
          className={`flex-grow-1 lh-copy pv0 ph2 bn br2`}
          onBlur={() => stopEditSelectedLineAction(dispatch)}
          value={line.title}
          onChange={e =>
            setEditingLineTitleAction(dispatch, e.target.value)
          }
        />
      ) : (
        <div
          ref={ref}
          className={`flex-grow-1 lh-copy ph2 br2 ${sc}`}
          tabIndex={isSelected ? 0 : null}
          onFocus={onFocusHandler}
          onClick={onTitleClickHandler}
        >
          {line.title}
        </div>
      )}
    </div>
  )
}
