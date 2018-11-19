import {
  put
} from 'redux-saga/effects'

export function* sagaGenesisInit() {
  yield put({ type: 'SG_SAGA_GENESIS_INITIALIZED' })
}
