import {
  fork,
  put,
  getContext,
  setContext,
  take
} from 'redux-saga/effects'
import getWeb3OrNull from '../utils/getWeb3OrNull'

export function* getReadWeb3() {
  let web3 = yield getContext('readWeb3')
  if (web3) {
    console.log('using readweb3')
  } else {
    console.log('falling back!')
  }
  if (!web3) {
    web3 = yield getContext('web3')
  }
  return web3
}

export function* setReadWeb3({ readWeb3 }) {
  yield setContext('readWeb3', readWeb3)
}

export function* web3NetworkId() {
  const web3 = yield getContext('web3')
  return yield web3.eth.net.getId()
}

export function* web3Initialize() {
  const web3 = getWeb3OrNull()

  if (web3) {
    try {
      yield web3.eth.net.getId()
      yield put({type: 'WEB3_INITIALIZED', web3})
    } catch(e) {
      console.error("Could not get network, web3 in bad state!")
      yield put({type: 'WEB3_INITIALIZE_ERROR'})
    }
  } else {
    console.error("window.web3 doesn't exist!")
    yield put({type: 'WEB3_INITIALIZE_ERROR'})
  }

  yield fork(take, 'SET_READ_WEB3', setReadWeb3)
}
