import { createCall } from '../create-call'

test('Can encrypt and decrypt', () => {
  var hash1 = createCall('address', 'method', 1)
  var hash2 = createCall('address', 'method', 1, 2)
  var hash3 = createCall('address', 'method', 1, 3)
  expect(hash1).not.toEqual(hash2)
  expect(hash2).not.toEqual(hash3)
  expect(hash1).not.toEqual(hash3)
})
