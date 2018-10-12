import Web3 from 'web3'
import getWeb3OrNull from './getWeb3OrNull'

let _web3

export default function() {
  if (!_web3) {
    _web3 = getWeb3OrNull()
  }
  if (!_web3) {
    _web3 = new Web3()
  }
  return _web3
}
