import {
  addAddressIfExists,
  getReceiptData,
  latestBlock
} from '../block-sagas'
import {
  call, put, take
} from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { block } from '../__stubs__/block'

describe('blockSagas', () => {
  describe('latestBlock()', () => {
    it('should correctly invalidate all of the addresses discovered', () => {
      const address = '0x8fa5944b15c1ab5db6bcfb0c888bdc6b242f0fa6'

      expectSaga(latestBlock, { block })
        .provide([
          [call(addAddressIfExists, new Set(), '0x8fa5944b15c1ab5db6bcfb0c888bdc6b242f0fa6'), true],
          [call(addAddressIfExists, new Set(), '0x09c0048e162455b981a6caa2815469dfea18759d'), false],
          [call(getReceiptData, '0xc42cbf81a8dc9c4a5473f3fa8759d18e17cdbcb338ffa57a65cbff1e615a01b5'), 'receipt']
        ])
        .call(addAddressIfExists, new Set(), '0x8fa5944b15c1ab5db6bcfb0c888bdc6b242f0fa6')
        .call(addAddressIfExists, new Set(), '0x09c0048e162455b981a6caa2815469dfea18759d')
        .call(getReceiptData, '0xc42cbf81a8dc9c4a5473f3fa8759d18e17cdbcb338ffa57a65cbff1e615a01b5')
        .put({ type: 'BLOCK_TRANSACTION_RECEIPT', receipt: 'receipt' })

    })
  })
})
