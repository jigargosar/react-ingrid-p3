import {
  complement,
  equals,
  head,
  lensPath,
  omit,
  over,
  prepend,
  tail,
} from 'ramda'
import { REDO, UNDO } from './actions'

export const initialHistoryState = { undoStack: [], redoStack: [] }

export function undo(state) {
  const { history, ...stateWithoutHistory } = state
  const { undoStack, redoStack } = history
  const lastState = head(undoStack)
  if (lastState) {
    const newHistory = {
      undoStack: tail(undoStack),
      redoStack: prepend(stateWithoutHistory, redoStack),
    }
    return { ...state, ...lastState, history: newHistory }
  }
  return state
}

export function redo(state) {
  const { history, ...stateWithoutHistory } = state
  const { undoStack, redoStack } = history
  const nextState = head(redoStack)
  if (nextState) {
    const newHistory = {
      undoStack: prepend(stateWithoutHistory, undoStack),
      redoStack: tail(redoStack),
    }
    return { ...state, ...nextState, history: newHistory }
  }
  return state
}

export const reducerEnhancer = reducer => {
  return (oldState, action) => {
    const newState = reducer(oldState, action)
    if ([UNDO, REDO].includes(action.type)) return newState

    const newStateWithoutHistory = omitHistory(newState)
    const oldStateWithoutHistory = omitHistory(oldState)
    if (notEquals(oldStateWithoutHistory, newStateWithoutHistory)) {
      return overHistory(({ undoStack }) => {
        return {
          undoStack: prepend(oldStateWithoutHistory, undoStack),
          redoStack: [],
        }
      })(newState)
    }

    return newState
  }
}

const overHistory = over(lensPath(['history']))
const omitHistory = omit(['history'])
const notEquals = complement(equals)
