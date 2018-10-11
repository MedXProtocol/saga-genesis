export class CallCountRegistry {
  constructor() {
    this.contractCalls = {}
    this.keyCalls = {}
  }

  count (call) {
    let callState = this._getContractCallState(call)
    if (callState) {
      return callState.count
    } else {
      return 0
    }
  }

  register (call, key) {
    this._increment(call)
    this._getKeyCalls(key).push(call)
  }

  deregister (key) {
    let deletedCalls = this.decrementCalls(this._getKeyCalls(key))
    delete this.keyCalls[key]
    return deletedCalls
  }

  decrementCalls (calls) {
    return calls.reduce((accumulator, call) => {
      if (!this._decrement(call)) {
        accumulator.push(call)
      }
      return accumulator
    }, [])
  }

  getContractCalls (address) {
    if (!address) { return {} }
    address = address.toLowerCase()
    let contractCalls = this.contractCalls[address]
    if (!contractCalls) {
      contractCalls = {}
      this.contractCalls[address] = contractCalls
    }
    return contractCalls
  }

  resetKeyCalls (key) {
    let keyCalls = this._getKeyCalls(key)
    this.keyCalls[key] = []
    return keyCalls
  }

  _getKeyCalls (key) {
    let keyCalls = this.keyCalls[key]
    if (!keyCalls) {
      keyCalls = []
      this.keyCalls[key] = keyCalls
    }
    return keyCalls
  }

  _increment (call) {
    let callState = this._getContractCallState(call)
    if (callState) {
      callState.count += 1
    } else {
      callState = {
        count: 1,
        call: call
      }
      this.getContractCalls(call.address)[call.hash] = callState
    }
    return callState.count
  }

  _decrement (call) {
    let callState = this._getContractCallState(call)
    let result = 0
    if (callState) {
      callState.count -= 1
      if (callState.count === 0) {
        delete this.getContractCalls(call.address)[call.hash]
      } else {
        result = callState.count
      }
    }
    return result
  }

  _getContractCallState (call) {
    return this.getContractCalls(call.address)[call.hash]
  }
}
