import { secp256k1 as secp } from 'ethereum-cryptography/secp256k1'
import { hashMessage } from '@au1/shared/utils/hashMessage.js'

export const signMessage = (message, privateKey) => {
  const signature = secp.sign(hashMessage(message), privateKey)

  return {
    signature: signature.toCompactHex(),
    recovery: signature.recovery,
  }
}
