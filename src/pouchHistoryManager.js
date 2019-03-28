import PouchDB from 'pouchdb-browser'
import { assocPath } from 'ramda'

export const pouchHistoryDB = new PouchDB(
  'http://127.0.0.1:5984/react-ingrid-p3-history',
)

export const initialPouchHistoryState = {
  dbInfoRD: { state: 'NOT_LOADED', data: null, error: null },
}

const dbInfoRDPath = ['pouchHistory', 'dbInfoRD']

// const overDBInfoRD = over(lensPath(dbInfoRDPath))

export function setPouchHistoryConnecting(state) {
  return assocPath(dbInfoRDPath, {
    state: 'LOADING',
    data: null,
    error: null,
  })(state)
}

export function setPouchHistoryConnected(state) {
  return assocPath(dbInfoRDPath, {
    state: 'SUCCESS',
    data: 'connectionInfoStub',
    error: null,
  })(state)
}

export function setPouchHistoryConnectionError(state) {
  return assocPath(dbInfoRDPath, {
    state: 'ERROR',
    data: null,
    error: 'errorInfoStub',
  })(state)
}
