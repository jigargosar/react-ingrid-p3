import PouchDB from 'pouchdb-browser'
import { toast } from 'react-toastify'
import { assoc, lensPath, over } from 'ramda'

const db = new PouchDB('http://127.0.0.1:5984/react-ingrid-p3-history')

db.info()
  .then(info => {
    console.debug(info)
    toast(`Connected to ${info.db_name}`)
  })
  .catch(e => {
    console.error(e)
    toast('Error connecting to Local Couch History')
  })

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
