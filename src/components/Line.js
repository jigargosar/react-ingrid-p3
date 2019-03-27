import React, { useEffect, useRef } from 'react'
import {
  selectLineAction,
  setEditingLineTitleAction,
  stopEditSelectedLineAction,
} from '../actions'
import { isEmpty } from 'ramda'

function isBlank(string) {
  return isEmpty(string.trim())
}

export const Line = React.memo(
  ({ line, isSelected, isEditing, dispatch }) => {
    const sc = `${isSelected ? 'bg-blue white' : ''}`
    const ref = useRef()
    const onFocusHandler = () => selectLineAction(line, dispatch)
    const onTitleClickHandler = () => selectLineAction(line, dispatch)

    useEffect(() => {
      const el = ref.current
      if (isSelected && el) {
        console.log(`'focusing'`, 'focusing')
        el.focus()
      }
    }, [isSelected, isEditing, ref.current])

    const displayTitle = isBlank(line.title) ? 'Untitled' : line.title

    // console.log('render')

    return (
      <>
        {isEditing ? (
          <div className="flex">
            <input
              ref={ref}
              className={`flex-grow-1 lh-copy pv0 ph2 bn br2`}
              onBlur={() => stopEditSelectedLineAction(dispatch)}
              value={line.title}
              onChange={e =>
                setEditingLineTitleAction(dispatch, e.target.value)
              }
            />
          </div>
        ) : (
          <div
            ref={ref}
            className={`lh-copy ph2 br2 ${sc}`}
            tabIndex={isSelected ? 0 : null}
            onFocus={onFocusHandler}
            onClick={onTitleClickHandler}
          >
            {displayTitle}
          </div>
        )}
      </>
    )
  },
)
