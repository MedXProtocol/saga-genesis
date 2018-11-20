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
import { takeSequentially } from '../utils/takeSequentially'
import { getReadWeb3 } from '../web3/web3-sagas'

const debug = require('debug')('block-sagas')

const MAX_RETRIES = 50

export function* getReceiptData(txHash) {
  const web3 = yield getReadWeb3()

  for (let i = 0; i < MAX_RETRIES; i++) {
    debug(`getReceiptData web3.eth.getTransactionReceipt loop: `, txHash)
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

function* updateCurrentBlockNumber() {
  debug(`updateCurrentBlockNumber()`)
  try {
    const web3 = yield getReadWeb3()

    const blockNumber = yield call(web3.eth.getBlockNumber)
    const currentBlockNumber = yield select(state => state.sagaGenesis.block.blockNumber)
    if (blockNumber !== currentBlockNumber) {
      debug(`updateCurrentBlockNumber got new block #`)
      yield put({
        type: 'UPDATE_BLOCK_NUMBER',
        blockNumber,
        lastBlockNumber: currentBlockNumber
      })
    }
  } catch (exception) {
    console.warn('Warn in updateCurrentBlockNumber: ' + exception)
    yield put({ type: 'SAGA_GENESIS_CAUGHT_ERROR', error: exception })
  }
}

function* gatherLatestBlocks({ blockNumber, lastBlockNumber }) {
  debug(`gatherLatestBlocks(${blockNumber}, ${lastBlockNumber})`)
  if (!lastBlockNumber) { return }

  try {
    for (var i = lastBlockNumber + 1; i <= blockNumber; i++) {
      const block = yield call(getBlockData, i)
      debug(`BLOCK_LATEST`)
      yield put({ type: 'BLOCK_LATEST', block })
    }
  } catch (e) {
    console.warn('warn in getLatestBlocks()')
    yield put({ type: 'SAGA_GENESIS_CAUGHT_ERROR', error: e })
  }
}

function* getBlockData(blockId) {
  debug(`getBlockData() (${blockId})`)

  const web3 = yield getReadWeb3()
  for (let i = 0; i < MAX_RETRIES; i++) {
    debug(`getBlockData() (attempt #${i})`)
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
      console.warn('warn in startBlockPolling()')
      yield put({ type: 'SAGA_GENESIS_CAUGHT_ERROR', error: e })
    }
    yield call(delay, 1000)
  }
}

export default function* () {
  yield fork(takeSequentially, 'UPDATE_BLOCK_NUMBER', gatherLatestBlocks)
  yield fork(startBlockPolling)
  debug('Started.')
}
