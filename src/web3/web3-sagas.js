import {
  put,
  getContext
} from 'redux-saga/effects'
import getWeb3OrNull from '~/getWeb3OrNull'

export function* web3Initialize() {
  const web3 = getWeb3OrNull()
  if (web3) {
    yield put({type: 'WEB3_INITIALIZED', web3})
  } else {
    console.error("window.web3 doesn't exist!")
    yield put({type: 'WEB3_INITIALIZE_ERROR'})
  }
}

export function* web3NetworkId() {
  const web3 = yield getContext('web3')
  return yield web3.eth.net.getId()
}
