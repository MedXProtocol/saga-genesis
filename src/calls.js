import {
  cancelled,
  getContext,
  put,
  take,
  select,
  spawn,
  call as reduxSagaCall
} from 'redux-saga/effects'
import { getReadWeb3 } from './web3/web3-sagas'
import { contractKeyByAddress } from './state-finders'

const debug = require('debug')('calls')

const callsInFlight = new Set()

export function isInFlight(call) {
  return callsInFlight.has(call.hash)
}

export function* waitForResponse(call) {
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

export function* executeWeb3Call(call) {
  const inFlight = isInFlight(call)
  if (!inFlight) {
    callsInFlight.add(call.hash)
    yield put({ type: 'WEB3_CALL', call })
  }
  return yield waitForResponse(call)
}

export function* registerCall(call) {
  let key = yield getContext('key')
  if (!key) {
    throw new Error(`registerCall called without a key scope: ${JSON.stringify(call)}`)
  }
  let callCountRegistry = yield getContext('callCountRegistry')
  callCountRegistry.register(call, key)
}

export function* callCount(call) {
  let callCountRegistry = yield getContext('callCountRegistry')
  return callCountRegistry.count(call)
}

/*
Triggers the web3 call.
*/
export function* web3CallExecute({call}) {
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

function* findWeb3Contract(address) {
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
