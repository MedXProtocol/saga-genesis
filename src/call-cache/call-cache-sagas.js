import {
  put,
  select,
  getContext,
  take,
  takeEvery,
  cancelled,
  spawn,
  call as reduxSagaCall
} from 'redux-saga/effects'
import { registerCall, callCount } from '../cache-scope/cache-scope-sagas'
import { getReadWeb3 } from '../web3/web3-sagas'
import { createCall } from '../utils/create-call'
import {
  contractKeyByAddress,
  contractByName
} from '../state-finders'
const debug = require('debug')('call-cache-sagas')

const callsInFlight = new Set()

function* isCacheActive(call) {
  const count = yield callCount(call)
  return count > 0
}

function isInFlight(call) {
  return callsInFlight.has(call.hash)
}

function* findResponse(call) {
  const callState = yield select(state => state.sagaGenesis.callCache[call.hash])
  return !callState || callState.response
}

function* waitForResponse(call) {
  while (true) {
    let action = yield take(['WEB3_CALL_RETURN', 'WEB3_CALL_ERROR'])
    if (action.call.hash === call.hash) {
      switch (action.type) {
        case 'WEB3_CALL_RETURN':
          return action.response
        default:
          throw action.error
      }
    }
  }
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

export function* executeWeb3Call(call) {
  const inFlight = isInFlight(call)
  if (!inFlight) {
    callsInFlight.add(call.hash)
    yield put({ type: 'WEB3_CALL', call })
  }
  return yield waitForResponse(call)
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

export function* findWeb3Contract(address) {
  const contractRegistry = yield getContext('readContractRegistry')
  const web3 = yield getReadWeb3()
  const contractKey = yield select(contractKeyByAddress, address)
  return contractRegistry.get(address, contractKey, web3)
}

function* findCallMethod(call) {
  const { address, method, args } = call
  const contract = yield findWeb3Contract(address)
  const contractMethod = contract.methods[method]
  if (!contractMethod) {
    yield put({ type: 'WEB3_CALL_ERROR', call, error: `Address ${address} does not have method '${method}'` })
    return
  }
  return contractMethod(...args).call
}

/*
Triggers the web3 call.
*/
function* web3CallExecute({call}) {
  debug(`web3CallExecute`, call)

  try {
    const account = yield select(state => state.sagaGenesis.accounts[0])
    const options = { from: account }
    const callMethod = yield findCallMethod(call)
    yield spawn(function* () {
      try {
        let response = yield reduxSagaCall(callMethod, options)
        yield put({ type: 'WEB3_CALL_RETURN', call, response })
      } catch (error) {
        debug(`web3CallExecute rpc ERROR: ${error}`)
        yield put({ type: 'WEB3_CALL_ERROR', call, error })
        console.error('Error on WEB3 Call: ', call.method, call.args, call, error)
      } finally {
        callsInFlight.delete(call.hash)
      }
    })
  } catch (error) {
    debug(`web3CallExecute general ERROR: ${error}`)
    if (yield cancelled()) {
      console.warn('Cancelled on WEB3 Call: ', call.method, call.args, call, error)
      yield put({ type: 'WEB3_CALL_CANCELLED', call })
    } else {
      console.error('Error on WEB3 Call: ', call.method, call.args, call, error)
      yield put({ type: 'WEB3_CALL_ERROR', call, error })
    }
  }
}

export default function* () {
  yield takeEvery('WEB3_CALL', web3CallExecute)
}
