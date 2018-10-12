import { sha3 } from './sha3'
import abi from 'ethjs-abi'

export class ABIHelper {
  constructor (abi) {
    this._lookup = {}
    this._topic0Lookup = {}
    abi.forEach((definition) => {
      this._lookup[definition.name] = definition
      if (definition.type === 'event') {
        const topic0 = this.topic0(definition)
        this._topic0Lookup[topic0] = definition
      }
    })
  }

  lookup (name) {
    return this._lookup[name]
  }

  topic0 (nameOrDefinition) {
    let definition
    if (typeof nameOrDefinition === 'string') {
      definition = this._lookup[nameOrDefinition]
    } else {
      definition = nameOrDefinition
    }
    const types = definition.inputs.map(input => input.type)
    return sha3(`${definition.name}(${types.join(',')})`)
  }

  decodeLogParameters (log) {
    const definition = this._topic0Lookup[log.topics[0]]
    return abi.decodeEvent(definition, log.data, log.topics)
  }
}
