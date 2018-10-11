import { CallCountRegistry } from '../call-count-registry'
import { createCall } from '../utils/create-call'

describe('CallCountRegistry', () => {
  let callCountRegistry
  let call1, call2, call3

  beforeEach(() => {
    callCountRegistry = new CallCountRegistry()
    call1 = createCall('asdf', 'asdf')
    call2 = createCall('qwer', 'qwer')
    call3 = createCall('zxcv', 'zxcv')
  })

  describe('register()', () => {
    it('should increment the call on register', () => {
      expect(callCountRegistry.count(call1)).toEqual(0)

      callCountRegistry.register(call1, 1)
      expect(callCountRegistry.count(call1)).toEqual(1)

      callCountRegistry.register(call1, 2)
      expect(callCountRegistry.count(call1)).toEqual(2)

      callCountRegistry.register(call2, 1)
      expect(callCountRegistry.count(call2)).toEqual(1)
      expect(callCountRegistry.count(call1)).toEqual(2)
    })
  })

  describe('deregister', () => {
    it('should decrement the count', () => {
      callCountRegistry.register(call1, 1)
      callCountRegistry.register(call2, 1)
      callCountRegistry.register(call1, 2)
      callCountRegistry.register(call2, 2)

      expect(callCountRegistry.count(call1)).toEqual(2)
      expect(callCountRegistry.count(call2)).toEqual(2)

      callCountRegistry.deregister(1)

      expect(callCountRegistry.count(call1)).toEqual(1)
      expect(callCountRegistry.count(call2)).toEqual(1)

      callCountRegistry.deregister(1)

      expect(callCountRegistry.count(call1)).toEqual(1)
      expect(callCountRegistry.count(call2)).toEqual(1)

      callCountRegistry.register(call1, 1)
      callCountRegistry.register(call2, 1)

      expect(callCountRegistry.count(call1)).toEqual(2)
      expect(callCountRegistry.count(call2)).toEqual(2)

      callCountRegistry.deregister(1)

      expect(callCountRegistry.count(call1)).toEqual(1)
      expect(callCountRegistry.count(call2)).toEqual(1)
    })
  })
})
