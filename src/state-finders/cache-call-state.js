import hashCall from '../utils/hash-call'
import { default as contractByName } from './contract-by-name'

export default function(state, addressOrName, method, ...args) {
  if (addressOrName && !addressOrName.startsWith('0x')) {
    addressOrName = contractByName(state, addressOrName)
  }
  const hash = hashCall.apply(null, [addressOrName, method, ...args])
  return state.sagaGenesis.callCache[hash] || {}
}
