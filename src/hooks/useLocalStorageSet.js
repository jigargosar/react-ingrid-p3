import { useEffect } from 'react'
import { compose, defaultTo, mergeDeepRight } from 'ramda'
import debounce from 'lodash.debounce'

function setItem(cacheKey, state) {
  localStorage.setItem(cacheKey, JSON.stringify(state))
}

const debouncedSetItem = debounce(setItem, 100, {
  leading: false,
  trailing: true,
  maxWait: 1000,
})

export function useLocalStorageSet(cacheKey, state) {
  useEffect(() => {
    debouncedSetItem(cacheKey, state)
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
