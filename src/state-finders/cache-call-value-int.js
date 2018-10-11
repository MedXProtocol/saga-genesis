import cacheCallState from './cache-call-state'

export default function(state, address, method, ...args) {
  const callState = cacheCallState(state, address, method, ...args)
  let response = callState.response
  if (response) {
    response = parseInt(response, 10)
  }
  return response
}
