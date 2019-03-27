import PouchDB from 'pouchdb-browser'
import { assoc, lensPath, over } from 'ramda'

export const pouchHistoryDB = new PouchDB(
  'http://127.0.0.1:5984/react-ingrid-p3-history',
)

export const initialPouchHistoryState = {
  connected: false,
}

const overPouchHistory = over(lensPath(['pouchHistory']))

function setPouchHistoryConnectedAction(state) {
  return overPouchHistory(assoc('connected', true))(state)
}

function setPouchHistoryConnectionError(state) {
  return overPouchHistory(assoc('connected', false))(state)
}
