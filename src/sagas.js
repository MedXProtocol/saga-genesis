import {
  all,
  fork,
  setContext
} from 'redux-saga/effects'

import accountSagas from './account/account-sagas'
import { addContract } from './contract/contract-sagas'
import blockSagas from './block/block-sagas'
import cacheScopeSagas from './cache-scope/cache-scope-sagas'
import cacheCallSagas from './call-cache/call-cache-sagas'
import networkSagas from './network/network-sagas'
import ethBalanceSagas from './ethBalance/ethBalanceSagas'
import transactionSagas, { web3Send } from './transaction/transaction-sagas'
import { web3Initialize, web3NetworkId } from './web3/web3-sagas'
import { logSaga } from './logs/logSaga'
import { takeOnceAndRun } from './utils/takeOnceAndRun'
import { takeSequentially } from './utils/takeSequentially'

export * from './call-cache/call-cache-sagas'

export function* start({ web3 }) {
  yield setContext({ web3 })
  yield all(
    [
      cacheCallSagas(),
      networkSagas(),
      accountSagas(),
      blockSagas(),
      cacheScopeSagas(),
      transactionSagas(),
      ethBalanceSagas(),
      logSaga()
    ]
  )
}

export {
  web3Send,
  addContract,
  web3NetworkId,
  takeOnceAndRun,
  takeSequentially
}

export default function* () {
  yield fork(takeOnceAndRun, 'WEB3_INITIALIZED', start)
  yield web3Initialize()
}
