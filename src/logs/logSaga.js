import {
  call,
  all,
  select,
  fork,
  put
} from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { takeSequentially } from '../utils/takeSequentially'
import { getReadWeb3 } from '../web3/web3-sagas'

const MAX_RETRIES = 50
const RETRY_DELAY = 2000

function* addSubscription({ address, fromBlock }) {
  address = address.toLowerCase()
  yield put({ type: 'LOG_LISTENER_ADDED', address })
  const listener = yield select(state => state.sagaGenesis.logs[address])
  if (listener.count === 1) {
    const web3 = yield getReadWeb3()
    const fromBlockHex = web3.utils.toHex(fromBlock || 0)

    for (let i = 0; i < MAX_RETRIES; i++) {
      const pastLogs = yield call([web3.eth, 'getPastLogs'], {
        fromBlock: fromBlockHex,
        toBlock: 'latest',
        address
      })

      if (pastLogs) {
        yield put({ type: 'PAST_LOGS', address, logs: pastLogs })
        return
      } else if (i > MAX_RETRIES) {
        // attempts failed after MAX_RETRIES x 2secs
        throw new Error('Unable to get pastLogs from network');
      } else {
        yield call(delay, RETRY_DELAY)
      }
    }

  }
}

function* checkReceiptForEvents({ receipt }) {
  yield all(receipt.logs.map(function* (log) {
    const address = log.address.toLowerCase()
    const logs = yield select(state => state.sagaGenesis.logs[address])
    if (logs) {
      yield put({ type: 'NEW_LOG', address, log })
    }
  }))
}

export function* logSaga() {
  yield fork(takeSequentially, 'ADD_LOG_LISTENER', addSubscription)
  yield fork(takeSequentially, 'BLOCK_TRANSACTION_RECEIPT', checkReceiptForEvents)
}
