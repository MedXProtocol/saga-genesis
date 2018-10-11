import logReducer from '../logReducer'

describe('logReducer', () => {
  describe('initialize', () => {
    it('should init the state', () => {
      expect(logReducer(undefined, {})).toEqual({})
    })
  })
  describe('ADD_LOG_LISTENER', () => {
    it('should set or increment the count', () => {
      expect(logReducer({}, { type: 'LOG_LISTENER_ADDED', address: '0x1' })).toEqual({
        '0x1': {
          count: 1
        }
      })
    })

    it('should increment the count', () => {
      const state = {
        '0x1': {
          count: 1
        }
      }
      expect(logReducer(state, { type: 'LOG_LISTENER_ADDED', address: '0x1' })).toEqual({
        '0x1': {
          count: 2
        }
      })
    })
  })
  
  describe('REMOVE_LOG_LISTENER', () => {
    it('should decrement the count', () => {
      const state = {
        '0x1': {
          count: 3,
          logs: []
        }
      }
      expect(logReducer(state, { type: 'REMOVE_LOG_LISTENER', address: '0x1' })).toEqual({
        '0x1': {
          count: 2,
          logs: []
        }
      })
    })

    it('should clear the state when count is zero', () => {
      const state = {
        '0x1': {
          count: 1,
          logs: []
        }
      }
      expect(logReducer(state, { type: 'REMOVE_LOG_LISTENER', address: '0x1' })).toEqual({})
    })
  })
})
