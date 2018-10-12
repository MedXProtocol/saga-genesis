import {
  put,
  select,
  getContext,
  take,
  takeEvery,
  cancelled,
  call as reduxSagaCall
} from 'redux-saga/effects'
import {
  web3CallExecute,
  executeWeb3Call,
  registerCall,
  callCount,
  waitForResponse,
  isInFlight
} from '../calls'
import { getReadWeb3 } from '../web3/web3-sagas'
import { createCall } from '../utils/create-call'
import {
  contractKeyByAddress,
  contractByName
} from '../state-finders'
const debug = require('debug')('call-cache-sagas')


function* isCacheActive(call) {
  const count = yield callCount(call)
  return count > 0
}

function* findResponse(call) {
  const callState = yield select(state => state.sagaGenesis.callCache[call.hash])
  return !callState || callState.response
}

export function* runCall(call, cacheActive) {
  if (typeof cacheActive === 'undefined') {
    cacheActive = yield isCacheActive(call)
  }
  let response = null
  const inFlight = isInFlight(call)
  if (cacheActive && !inFlight) {
    response = yield findResponse(call)
  } else {
    response = yield executeWeb3Call(call)
  }
  return response
}

/**
  Calls web3Call and increments the call count
*/
export function* cacheCall(addressOrName, method, ...args) {
  if (addressOrName.startsWith('0x')) {
    return yield cacheCallByAddress(addressOrName, method, ...args)
  } else {
    return yield cacheCallByName(addressOrName, method, ...args)
  }
}

export function* cacheCallByName(name, method, ...args) {
  const address = yield select(contractByName, name)
  if (!address) {
    return null
  }
  return yield cacheCallByAddress(address, method, ...args)
}

export function* cacheCallByAddress(address, method, ...args) {
  const call = createCall(address, method, ...args)
  const cacheActive = yield isCacheActive(call)
  yield registerCall(call)
  return yield runCall(call, cacheActive)
}

export function* callNoCache(address, method, ...args) {
  const call = createCall(address, method, ...args)
  yield put({ type: 'WEB3_CALL', call })
  return yield waitForResponse(call)
}

export function* web3Call(address, method, ...args) {
  const call = createCall(address, method, ...args)
  return yield runCall(call)
}

export default function* () {
  yield takeEvery('WEB3_CALL', web3CallExecute)
}
