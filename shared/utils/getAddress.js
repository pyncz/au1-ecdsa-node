import { toHex } from 'ethereum-cryptography/utils'
import { hashMessage } from './hashMessage.js'

export const getAddress = (publicKey) => {
  const hash = hashMessage(publicKey.slice(1))
  return toHex(hash.slice(-20))
}
