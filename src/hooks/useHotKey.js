import { useEffect } from 'react'
import { find, toPairs } from 'ramda'
import isHotkey from 'is-hotkey'

function findHotKeyHandler(e, km) {
  return find(([key, handler]) => {
    if (isHotkey(key, e)) {
      return handler
    }
  })(toPairs(km))
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
