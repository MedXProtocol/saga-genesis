import {
  put,
  getContext,
  select,
  call,
  fork
} from 'redux-saga/effects'
import {
  delay
} from 'redux-saga'

export function* refreshAccounts() {
  try {
    const web3 = yield getContext('web3')
    const existingAccount = yield select((state) => state.sagaGenesis.accounts[0])
    const accounts = yield web3.eth.getAccounts()

    if (accounts[0] !== existingAccount) {
      yield put({type: 'WEB3_ACCOUNTS', accounts})
    }
  } catch (e) {
    yield put({ type: 'SAGA_GENESIS_CAUGHT_ERROR', error: e })
  }
}

export function* startAccountsPolling() {
  while (true) {
    yield call(refreshAccounts)
    yield call(delay, 1000)
  }
}

export default function* () {
  yield fork(startAccountsPolling)
}
