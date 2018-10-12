export function* executeWeb3Call(call) {
  const inFlight = isInFlight(call)
  if (!inFlight) {
    callsInFlight.add(call.hash)
    yield put({ type: 'WEB3_CALL', call })
  }
  return yield waitForResponse(call)
}

export function* registerCall(call) {
  let key = yield getContext('key')
  if (!key) {
    throw new Error(`registerCall called without a key scope: ${JSON.stringify(call)}`)
  }
  let callCountRegistry = yield getContext('callCountRegistry')
  callCountRegistry.register(call, key)
}

export function* callCount(call) {
  let callCountRegistry = yield getContext('callCountRegistry')
  return callCountRegistry.count(call)
}
