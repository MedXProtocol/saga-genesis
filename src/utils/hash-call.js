import { sha3 } from './sha3'

export default function () {
  let digest = "NotAHex" + Array.from(arguments).join('-')
  return sha3(digest)
}
