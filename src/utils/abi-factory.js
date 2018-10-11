export function abiFactory(abi) {
  return function (web3, address) {
    return new web3.eth.Contract(abi, address)
  }
}
