import Web3 from 'web3'

let _web3 = null

export default function() {
  if (!_web3 && window && window.web3) {
    _web3 = new Web3(window.web3.currentProvider)
  }
  return _web3
}
