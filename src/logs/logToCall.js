import hashCall from '../utils/hash-call'

export function logToCall(address) {
  let call = { address }
  call.hash = hashCall(address)
  return call
}
