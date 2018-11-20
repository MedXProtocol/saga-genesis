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
import { takeSequentially } from '../utils/takeSequentially'
import { getReceiptData } from '../block/block-sagas'
import {
  contractKeyByAddress
} from '../state-finders'
import {
  executeWeb3Call
} from '../calls'
import { addAddressIfExists } from '../contract/addAddressIfExists'
const debug = require('debug')('cache-scope-sagas.js')

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


export function* invalidateBlockAddresses({ block }) {
  debug(`invalidateBlockAddresses(): `, block)
  try {
    const addressSet = new Set()
    for (var i in block.transactions) {
      const transaction = block.transactions[i]
      const to = yield reduxSagaCall(addAddressIfExists, addressSet, transaction.to)
      const from = yield reduxSagaCall(addAddressIfExists, addressSet, transaction.from)

      if (to || from) { // if the transaction was one of ours
        const receipt = yield reduxSagaCall(getReceiptData, transaction.hash)
        yield addTransactionReceiptAddresses(receipt, addressSet)
      }
    }

    yield invalidateAddressSet(addressSet)
  } catch (e) {
    console.warn('warn in latestBlock()')
    yield put({ type: 'SAGA_GENESIS_CAUGHT_ERROR', error: e })
  }
}

function* addTransactionReceiptAddresses(receipt, addressSet) {
  debug(`addTransactionReceiptAddresses(): ${receipt}`)
  yield all(receipt.logs.map(function* (log) {
    yield reduxSagaCall(addAddressIfExists, addressSet, log.address)
    if (log.topics) {
      yield all(log.topics.map(function* (topic) {
        if (topic) {
          // topics are 32 bytes and will have leading 0's padded for typical Eth addresses, ignore them
          const actualAddress = '0x' + topic.substr(26)
          yield reduxSagaCall(addAddressIfExists, addressSet, actualAddress)
        }
      }))
    }
  }))
}

export function* invalidateAddressSet(addresses) {
  yield all(Array.from(addresses).map(function* (address) {
    yield fork(put, {type: 'CACHE_INVALIDATE_ADDRESS', address})
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
  // yield takeEvery('SG_TRANSACTION_CONFIRMED', invalidateTransaction)
  yield fork(takeSequentially, 'BLOCK_LATEST', invalidateBlockAddresses)
  yield takeEvery('CACHE_INVALIDATE_ADDRESS', invalidateAddress)
}
