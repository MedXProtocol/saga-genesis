import {
  put,
  all,
  select,
  takeEvery,
  takeLatest,
  fork,
  getContext,
  setContext,
  call as reduxSagaCall,
  cancel,
  cancelled,
  take
} from 'redux-saga/effects'
import {
  contractKeyByAddress
} from '../state-finders'
import {
  executeWeb3Call
} from '../calls'

export function* deregisterKey(key) {
  const callCountRegistry = yield getContext('callCountRegistry')
  const calls = callCountRegistry.deregister(key)
  if (calls.length) {
    yield put({type: 'WEB3_STALE_CALLS', calls})
  }
}

export function* invalidateAddress({ address }) {
  let callCountRegistry = yield getContext('callCountRegistry')
  let contractCalls = Object.values(callCountRegistry.getContractCalls(address))
  if (!contractCalls) { return }
  yield all(contractCalls.map(function* (callState) {
    if (callState.count > 0) {
      const { call } = callState
      yield executeWeb3Call(call)
    }
  }))
}

export function* invalidateTransaction({ transactionId, call, receipt }) {
  let contractAddresses = Object.values(receipt.events || {}).reduce((addressSet, event) => {
    return addressSet.add(event.address)
  }, new Set())

  contractAddresses.add(call.address)

  yield all(Array.from(contractAddresses).map(function* (address) {
    const contractKey = yield select(contractKeyByAddress, address)
    if (contractKey) {
      yield fork(put, {type: 'CACHE_INVALIDATE_ADDRESS', address})
    }
  }))
}

export function* runSaga({saga, props, key}) {
  try {
    yield setContext({ key })
    const callCountRegistry = yield getContext('callCountRegistry')
    let oldCalls = callCountRegistry.resetKeyCalls(key)
    yield reduxSagaCall(saga, props)
    const emptyCalls = callCountRegistry.decrementCalls(oldCalls)
    if (emptyCalls.length) {
      yield put({ type: 'WEB3_STALE_CALLS', calls: emptyCalls })
    }
  } catch (error) {
    if (!(yield cancelled())) {
      throw error
    } else {
      yield put({type: 'SAGA_CANCELLED', key})
    }
  }
}

function* prepareSaga({ saga, props, key }) {
  const action = `RUN_SAGA_${key}`
  const task = yield takeLatest(action, runSaga)
  yield runSaga({ saga, props, key })
  yield take(`END_SAGA_${key}`)
  yield deregisterKey(key)
  yield cancel(task)
}

export default function* () {
  yield takeEvery('PREPARE_SAGA', prepareSaga)
  yield takeEvery('TRANSACTION_CONFIRMED', invalidateTransaction)
  yield takeEvery('CACHE_INVALIDATE_ADDRESS', invalidateAddress)
}
