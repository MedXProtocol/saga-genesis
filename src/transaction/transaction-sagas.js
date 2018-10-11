import {
  select,
  put,
  getContext,
  takeEvery,
  take
} from 'redux-saga/effects'
import {
  eventChannel,
  END
} from 'redux-saga'
import { contractKeyByAddress } from '../state-finders'
const debug = require('debug')('transaction-sagas')

function createTransactionEventChannel (web3, call, transactionId, send, options) {
  debug(`#${transactionId}: createTransactionEventChannel`, call)

  return eventChannel(emit => {
    let promiEvent = send(options)
      .on('transactionHash', (txHash) => {
        debug(`#${transactionId}: transactionHash ${txHash}`)
        emit({ type: 'TRANSACTION_HASH', transactionId, txHash, call })
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        debug(`#${transactionId}: confirmation ${confirmationNumber}`)
        emit({ type: 'TRANSACTION_CONFIRMATION', transactionId, confirmationNumber, receipt })
        if (confirmationNumber > 2) {
          emit({ type: 'TRANSACTION_CONFIRMED', transactionId, call, confirmationNumber, receipt })
          emit(END)
        }
      })
      .on('receipt', (receipt) => {
        debug(`#${transactionId}: receipt`, receipt)
        emit({ type: 'TRANSACTION_RECEIPT', transactionId, receipt })
      })
      .on('error', error => {
        debug(`#${transactionId}: error ${error}`)

        const txObject = { type: 'TRANSACTION_ERROR', transactionId, call, error: error.toString() }
        const gasUsed = error.message.match(/"gasUsed": ([0-9]*)/)

        if (gasUsed)
          txObject['gasUsed'] = gasUsed[1]

        emit(txObject)
        emit(END)
      })

    return () => {
      promiEvent.removeAllListeners()
    }
  })
}

export function* web3Send({ transactionId, call, options }) {
  debug(`#${transactionId}: web3Send`, call)

  const { address, method, args } = call
  try {
    const account = yield select(state => state.sagaGenesis.accounts[0])
    options = Object.assign({
      from: account
    }, options || {})

    const contractRegistry = yield getContext('writeContractRegistry')
    const web3 = yield getContext('web3')
    const contractKey = yield select(contractKeyByAddress, address)
    const contract = contractRegistry.get(address, contractKey, web3)
    const contractMethod = contract.methods[method]
    if (!contractMethod) {
      yield put({type: 'TRANSACTION_ERROR', transactionId, call, error: `Address ${address} does not have method '${method}'`})
      return
    }
    const func = contractMethod(...args)
    const send = func.send

    const transactionChannel = createTransactionEventChannel(web3, call, transactionId, send, options)
    try {
      while (true) {
        yield put(yield take(transactionChannel))
      }
    } finally {
      transactionChannel.close()
    }
  } catch (error) {
    debug(`#${transactionId} web3Send: ERROR`, call)
    yield put({type: 'TRANSACTION_ERROR', transactionId, call, error: error.message})
  }
}

export default function* () {
  yield takeEvery('SEND_TRANSACTION', web3Send)
}
