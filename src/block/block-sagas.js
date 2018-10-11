import {
  call,
  put,
  all,
  select,
  fork
} from 'redux-saga/effects'
import {
  delay
} from 'redux-saga'
import {
  contractKeyByAddress
} from '../state-finders'
import { takeSequentially } from '~/utils/takeSequentially'
import { getReadWeb3 } from '~/web3/web3-sagas'

const debug = require('debug')('block-sagas')

const MAX_RETRIES = 50

export function* addAddressIfExists(addressSet, address) {
  if (!address) { return false }
  address = address.toLowerCase()
  const contractKey = yield select(contractKeyByAddress, address)
  if (contractKey) {
    addressSet.add(address)
    return true
  }
  return false
}

export function* getReceiptData(txHash) {
  const web3 = yield getReadWeb3()

  for (let i = 0; i < MAX_RETRIES; i++) {
    const receipt = yield call(web3.eth.getTransactionReceipt, txHash)

    if (receipt) {
      return receipt
    } else if (i > MAX_RETRIES) {
      // attempts failed after 50 x 2secs
      throw new Error('Unable to get receipt from network');
    } else {
      yield call(delay, 2000)
    }
  }
}

function* transactionReceipt({ receipt }) {
  debug(`transactionReceipt(): ${receipt}`)
  const addressSet = new Set()
  yield all(receipt.logs.map(function* (log) {
    yield call(addAddressIfExists, addressSet, log.address)
    if (log.topics) {
      yield all(log.topics.map(function* (topic) {
        if (topic) {
          // topics are 32 bytes and will have leading 0's padded for typical Eth addresses, ignore them
          const actualAddress = '0x' + topic.substr(26)
          yield call(addAddressIfExists, addressSet, actualAddress)
        }
      }))
    }
  }))
  yield invalidateAddressSet(addressSet)
}

export function* invalidateAddressSet(addressSet) {
  yield all(Array.from(addressSet).map(function* (address) {
    yield fork(put, {type: 'CACHE_INVALIDATE_ADDRESS', address})
  }))
}

export function* latestBlock({ block }) {
  debug(`latestBlock(): `, block)
  try {
    const addressSet = new Set()
    for (var i in block.transactions) {
      const transaction = block.transactions[i]
      const to = yield call(addAddressIfExists, addressSet, transaction.to)
      const from = yield call(addAddressIfExists, addressSet, transaction.from)
      if (to || from) { // if the transaction was one of ours
        const receipt = yield call(getReceiptData, transaction.hash)
        yield put({ type: 'BLOCK_TRANSACTION_RECEIPT', receipt })
      }
    }
    yield call(invalidateAddressSet, addressSet)
  } catch (e) {
    yield put({ type: 'SAGA_GENESIS_CAUGHT_ERROR', error: e })
  }
}

function* updateCurrentBlockNumber() {
  try {
    const web3 = yield getReadWeb3()

    const blockNumber = yield call(web3.eth.getBlockNumber)
    const currentBlockNumber = yield select(state => state.sagaGenesis.block.blockNumber)
    if (blockNumber !== currentBlockNumber) {
      yield put({
        type: 'UPDATE_BLOCK_NUMBER',
        blockNumber,
        lastBlockNumber: currentBlockNumber
      })
    }
  } catch (exception) {
    console.warn('Warn in updateCurrentBlockNumber: ' + exception)
    bugsnagClient.notify(exception)
  }
}

function* gatherLatestBlocks({ blockNumber, lastBlockNumber }) {
  debug(`gatherLatestBlocks(${blockNumber}, ${lastBlockNumber})`)
  if (!lastBlockNumber) { return }

  try {
    for (var i = lastBlockNumber + 1; i <= blockNumber; i++) {
      const block = yield call(getBlockData, i)
      yield put({ type: 'BLOCK_LATEST', block })
    }
  } catch (e) {
    yield put({ type: 'SAGA_GENESIS_CAUGHT_ERROR', error: e })
  }
}

function* getBlockData(blockId) {
  const web3 = yield getReadWeb3()
  for (let i = 0; i < MAX_RETRIES; i++) {
    const block = yield call(web3.eth.getBlock, blockId, true)

    if (block) {
      return block
    } else if (i > MAX_RETRIES) {
      // attempts failed after 50 x 2secs
      throw new Error('Unable to get block from network');
    } else {
      yield call(delay, 2000)
    }
  }
}

function* startBlockPolling() {
  while (true) {
    try {
      yield call(updateCurrentBlockNumber)
    } catch (e) {
      yield put({ type: 'SAGA_GENESIS_CAUGHT_ERROR', error: e })
    }
    yield call(delay, 1000)
  }
}

export default function* () {
  yield fork(takeSequentially, 'BLOCK_LATEST', latestBlock)
  yield fork(takeSequentially, 'BLOCK_TRANSACTION_RECEIPT', transactionReceipt)
  yield fork(takeSequentially, 'UPDATE_BLOCK_NUMBER', gatherLatestBlocks)
  yield fork(startBlockPolling)
  debug('Started.')
}
