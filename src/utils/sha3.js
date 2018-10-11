import getWeb3 from '~/get-web3'

export function sha3() {
  const web3 = getWeb3()
  if (web3.utils) {
    return web3.utils.sha3.call(null, ...arguments)
  } else {
    return web3.sha3.call(null, ...arguments)
  }
}
