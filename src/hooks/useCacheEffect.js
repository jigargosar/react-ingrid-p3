import { useEffect } from 'react'
import { defaultTo } from 'ramda'

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

export function getCachedOrEmptyObj(key) {
  return defaultTo({}, getCached(key))
}
