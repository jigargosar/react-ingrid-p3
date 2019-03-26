import { useEffect } from 'react'

export function useCacheEffect(cacheKey, state) {
  useEffect(() => {
    localStorage.setItem(cacheKey, JSON.stringify(state))
  }, [state])
}

export function getCached(key) {
  const jsonString = localStorage.getItem(key)
  if (jsonString) {
    return JSON.parse(jsonString)
  }
  return null
}
