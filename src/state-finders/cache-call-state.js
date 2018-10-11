import hashCall from '../utils/hash-call'
import { contractByName } from '~/state-finders'

export default function(state, addressOrName, method, ...args) {
  if (addressOrName && !addressOrName.startsWith('0x')) {
    addressOrName = contractByName(state, addressOrName)
  }
  const hash = hashCall.apply(null, [addressOrName, method, ...args])
  return state.sagaGenesis.callCache[hash] || {}
}
