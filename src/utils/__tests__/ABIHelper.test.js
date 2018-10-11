import { ABIHelper } from '../ABIHelper'
import { sha3 } from '~/utils/sha3'

describe('ABIHelper', () => {
  let abiHelper
  const CASE_CREATED_DEFINITION = {
    name: 'CaseCreated',
    type: 'event',
    inputs: [
      {
        "name": "patient",
        "type": "address"
      },
      {
        "name": "encryptedCaseKey",
        "type": "bytes"
      },
      {
        "name": "caseKeySalt",
        "type": "bytes"
      },
      {
        "name": "caseDataHash",
        "type": "bytes"
      }
    ]
  }

  beforeAll(() => {
    abiHelper = new ABIHelper([
      CASE_CREATED_DEFINITION
    ])
  })

  describe('lookup', () => {
    it('should lookup correctly', () => {
      expect(abiHelper.lookup('CaseCreated')).toEqual(CASE_CREATED_DEFINITION)
    })
  })

  describe('topic0', () => {
    it('should hash correctly', () => {
      expect(abiHelper.topic0('CaseCreated')).toEqual(sha3('CaseCreated(address,bytes,bytes,bytes)'))
    })
  })
})
