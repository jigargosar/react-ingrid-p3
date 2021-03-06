import { useEffect } from 'react'
import { compose, find, isNil, nth, toPairs, unless } from 'ramda'
import isHotkey from 'is-hotkey'

function findHotKeyHandler(e, km) {
  return compose(
    unless(isNil, nth(1)),
    find(([key]) => isHotkey(key, e)),
    toPairs,
  )(km)
}

export function useHotKeyDispatcher(currentHotKeyMap, dispatch) {
  useEffect(() => {
    function listener(e) {
      const handler = findHotKeyHandler(e, currentHotKeyMap)
      if (handler) {
        e.preventDefault()
        handler(dispatch)
      }
    }

    window.addEventListener('keydown', listener)

    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [])
}
