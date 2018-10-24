export class ContractRegistry {
  constructor (config) {
    this.config = config
    this.contractCache = {}
  }

  has(address) {
    address = this.cleanAddress(address)
    return !!this.contractCache[address]
  }

  get(address, contractKey, web3) {
    address = this.cleanAddress(address)
    var contract = this.contractCache[address]
    if (!contract) {
      if (!contractKey) {
        throw new Error(`No contract found for address ${address}, you must pass a contractKey for it to be constructed`)
      }
      if (!this.config.contractFactories[contractKey]) {
        throw new Error(`You need to register the ${contractKey} contract in your ContractRegistry options`)
      }
      contract = this.config.contractFactories[contractKey](web3, address)
      this.contractCache[address] = contract
    }
    return contract
  }

  cleanAddress (address) {
    if (address)
      address = address.toLowerCase()
    return address
  }
}
