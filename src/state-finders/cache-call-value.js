import cacheCallState from './cache-call-state'

export default function(state, address, method, ...args) {
  let callState = cacheCallState(state, address, method, ...args)
  if (callState) return callState.response
}
