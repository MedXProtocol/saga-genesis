import {
  put,
  select
} from 'redux-saga/effects'
import {
  contractKeyByAddress
} from '../state-finders'

export function* addContract({address, name, contractKey, networkId}) {
  address = address.toLowerCase()

  if (!networkId) {
    networkId = yield select((state) => state.sagaGenesis.network.networkId)

    if (!networkId) {
      console.warn(`No network ID available, cannot store ${contractKey}: ${address}`)
    }
  }

  let existingContractKey = yield select(contractKeyByAddress, address)
  if (existingContractKey !== contractKey) {
    // console.table({type: "ADD_CONTRACT", address, name, contractKey, networkId})
    yield put({type: "ADD_CONTRACT", address, name, contractKey, networkId})
  }
}
