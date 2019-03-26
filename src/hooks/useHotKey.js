import { useEffect } from 'react'
import { compose, find, isNil, nth, toPairs, unless } from 'ramda'
import isHotkey from 'is-hotkey'

function findHotKeyHandler(e, km) {
  return compose(
    unless(isNil, nth(1)),
    find(([key, handler]) => {
      if (isHotkey(key, e)) {
        return handler
      }
    }),
    toPairs,
  )(km)
}

export function useHotKeyDispatcher(currentHotKeyMap, dispatch) {
  useEffect(() => {
    window.addEventListener('keydown', listener)

    function listener(e) {
      const handler = findHotKeyHandler(e, currentHotKeyMap())
      if (handler) {
        e.preventDefault()
        handler(dispatch)
      }
    }

    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [])
}
