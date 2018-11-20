import {
  select
} from 'redux-saga/effects'
import {
  contractKeyByAddress
} from '../state-finders'

export function* addAddressIfExists(addressSet, address) {
  if (!address) { return false }
  address = address.toLowerCase()
  const contractKey = yield select(contractKeyByAddress, address)
  if (contractKey) {
    addressSet.add(address)
    return true
  }
  return false
}
