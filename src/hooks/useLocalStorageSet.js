import { useEffect } from 'react'
import { compose, defaultTo, mergeDeepRight } from 'ramda'

export function useLocalStorageSet(cacheKey, state) {
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

function getCachedOrEmptyObj(key) {
  return defaultTo({}, getCached(key))
}

export function localStorageGetAndMerge(cacheKey, stateToMerge) {
  return compose(
    mergeDeepRight(stateToMerge),
    getCachedOrEmptyObj,
  )(cacheKey)
}
