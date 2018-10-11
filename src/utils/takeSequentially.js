import {
  buffers
} from 'redux-saga'
import {
  take,
  call,
  actionChannel
} from 'redux-saga/effects'

export function* takeSequentially(pattern, saga) {
  const channel = yield actionChannel(pattern, buffers.expanding(50))
  while (true) {
    const action = yield take(channel)
    yield call(saga, action)
  }
}
