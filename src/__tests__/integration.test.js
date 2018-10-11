import { store } from '~/test-support/integration-store'

describe('Saga Genesis Integration Test', () => {
  describe('Saga lifecycle', () => {
    it('Saga lifecycle should work', () => {
      const key = 1
      let value = 0

      function* saga({ propValue }) {
        value = propValue
      }

      store.dispatch({ type: 'PREPARE_SAGA', saga, key, props: { propValue: 31 }})
      expect(value).toEqual(31)
      store.dispatch({ type: `RUN_SAGA_${key}`, saga, key, props: { propValue: 33 }})
      expect(value).toEqual(33)
      store.dispatch({ type: `END_SAGA_${key}` })
      store.dispatch({ type: `RUN_SAGA_${key}`, saga, key, props: { propValue: 12 }})
      expect(value).toEqual(33)
    })
  })
})
