import { abiFactory } from '~/utils/abi-factory'

const REGISTRY_ABI = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_key",
        "type": "bytes32"
      },
      {
        "name": "_targetContract",
        "type": "address"
      }
    ],
    "name": "register",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_key",
        "type": "bytes32"
      }
    ],
    "name": "deregister",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_key",
        "type": "bytes32"
      }
    ],
    "name": "lookup",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]

export default {
  contractFactories: {
    Test: abiFactory(REGISTRY_ABI)
  }
}
