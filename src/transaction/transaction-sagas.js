import {
  call as reduxSagaCall,
  fork,
  select,
  put,
  getContext,
  takeEvery,
  take
} from 'redux-saga/effects'
import {
  delay,
  eventChannel,
  END
} from 'redux-saga'
import { contractKeyByAddress } from '../state-finders'
import { web3NetworkId } from '../web3/web3-sagas'
const debug = require('debug')('transaction-sagas')

function createTransactionEventChannel (web3, call, transactionId, send, options) {
  debug(`#${transactionId}: createTransactionEventChannel`, call)

  return eventChannel(emit => {
    let promiEvent = send(options)
      .on('transactionHash', (txHash) => {
        debug(`#${transactionId}: transactionHash ${txHash}`)
        emit({ type: 'SG_TRANSACTION_HASH', transactionId, txHash, call })
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        debug(`#${transactionId}: confirmation ${confirmationNumber}`)
        emit({ type: 'SG_TRANSACTION_CONFIRMATION', transactionId, confirmationNumber, receipt })

        // TODO: Make this magic number configurable by whoever is
        //       consuming the Saga Genesis API
        if (confirmationNumber > 0) {
          emit({ type: 'SG_TRANSACTION_CONFIRMED', transactionId, call, confirmationNumber, receipt })
          emit(END)
        }
      })
      .on('receipt', (receipt) => {
        debug(`#${transactionId}: receipt`, receipt)
        emit({ type: 'SG_TRANSACTION_RECEIPT', transactionId, receipt })
      })
      .on('error', error => {
        debug(`#${transactionId}: error ${error}`)

        const txObject = { type: 'SG_TRANSACTION_ERROR', transactionId, call, error: error.toString() }
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
    // add new tx to reducer
    yield put({ type: 'SG_START_TRANSACTION', transactionId, call, options, address })

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
      yield put({type: 'SG_TRANSACTION_ERROR', transactionId, call, error: `Address ${address} does not have method '${method}'`})
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
    yield put({type: 'SG_TRANSACTION_ERROR', transactionId, call, error: error.message})
  }
}

function* checkExternalTransactionReceipts(web3) {
  try {
    const networkId = yield web3NetworkId()
    // const web3 = customProviderWeb3(networkId)
    const web3 = yield getContext('web3')
    const transactions = yield select((state) => Object.values(state.sagaGenesis.transactions))

    for (let i = 0; i < transactions.length; i++) {
      const {
        transactionId,
        txHash,
        txType,
        inFlight,
        call,
        submitted,
        complete
      } = transactions[i]

      if (submitted && !complete) {
        const receipt = yield reduxSagaCall(web3.eth.getTransactionReceipt, txHash)

        if (receipt) {
          yield put({ type: 'SG_TRANSACTION_RECEIPT', transactionId, receipt, call })
          console.log(receipt)

          if (receipt.status) {
            yield put({ type: 'SG_TRANSACTION_CONFIRMED', transactionId, receipt, call })
          } else {
            yield put({ type: 'SG_TRANSACTION_ERROR', transactionId, call, error: `` })
          }
        } else {
          // console.log('ignoring as not yet mined')
        }
      }
    }
  } catch (error) {
    console.warn(error)
  }
}

function* pollTransactions() {
  while (true) {
    yield reduxSagaCall(checkExternalTransactionReceipts)
    yield reduxSagaCall(delay, 2000)
  }
}

export default function* () {
  yield fork(pollTransactions)
  yield takeEvery('SG_SEND_TRANSACTION', web3Send)
}
