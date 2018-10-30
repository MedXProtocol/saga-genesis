import {
  put
} from 'redux-saga/effects'

export function* sagaGenesisInit() {
  yield put({ type: 'SAGA_GENESIS_INITIALIZED' })
}
