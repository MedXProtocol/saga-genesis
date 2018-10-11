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
import { bugsnagClient } from '~/bugsnagClient'

export function* refreshNetwork() {
  const web3 = yield getContext('web3')
  const existingNetworkId = yield select((state) => state.sagaGenesis.network.networkId)

  try {
    let networkId = yield web3.eth.net.getId()
    if (existingNetworkId !== networkId) {
      // console.log('FINALLY HAVE NETWORK ID!')
      yield put({type: 'WEB3_NETWORK_ID', web3, networkId})
    }
  } catch(e) {
    bugsnagClient.notify(e)
  }
}

export function* startNetworkPolling() {
  while (true) {
    yield call(refreshNetwork)
    yield call(delay, 1000)
  }
}

export default function* () {
  yield fork(startNetworkPolling)
}
