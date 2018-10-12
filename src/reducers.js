import { combineReducers } from 'redux'
import accounts from './account/account-reducer'
import contracts from './contract/contract-reducer'
import callCache from './call-cache/call-cache-reducer'
import transactions from './transaction/transaction-reducer'
import ethBalance from './ethBalance/ethBalanceReducer'
import network from './network/network-reducer'
import web3 from './web3/web3-reducer'
import logs from './logs/logReducer'
import block from './block/block-reducer'

export const reducers = combineReducers({
  callCache,
  accounts,
  transactions,
  network,
  ethBalance,
  contracts,
  web3,
  logs,
  block
})
