import { useEffect } from 'react'
import { reduce, reduced } from 'ramda'
import isHotkey from 'is-hotkey'

function findHotKeyHandler(e, km) {
  return reduce((handler, key) => {
    if (isHotkey(key, e)) {
      return reduced(handler)
    }
  })(km)
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
