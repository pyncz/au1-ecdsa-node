import { recoverPublicKey } from './recoverPublicKey.js'
import { getAddress } from '@au1/shared/utils/getAddress.js'

export const verifySignature = (address, messageHash, signature, recovery) => {
  const publicKey = recoverPublicKey(messageHash, signature, recovery)
  return address === getAddress(publicKey)
}
