import hashCall from './hash-call'

class Call {
  constructor (address, method, ...args) {
    this.address = address
    this.method = method
    this.args = args
    this.hash = hashCall(address, method, ...args)
  }

  toString (call) {
    return `${this.address}: ${this.method}(${this.args.map(a => a.toString()).join(', ')})`
  }
}

export function createCall(address, method, ...args) {
  return new Call(address, method, ...args)
}
