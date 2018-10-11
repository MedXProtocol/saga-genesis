import {
  all
} from 'redux-saga/effects'

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import cacheScopeSagas from '~/cache-scope/cache-scope-sagas'
import cacheCallSagas from '~/call-cache/call-cache-sagas'

import { sagaGenesis as reducers } from '~/reducers'
import { ContractRegistry, CallCountRegistry } from '~'
import contractRegistryOptions from './contract-registry-options'

export const contractRegistry = new ContractRegistry(contractRegistryOptions)
export const callCountRegistry = new CallCountRegistry()

export const sagaMiddleware = createSagaMiddleware({
  context: {
    contractRegistry,
    callCountRegistry
  }
})

export const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(function* () {
  yield all(
    [
      cacheCallSagas(),
      cacheScopeSagas()
    ]
  )
})
