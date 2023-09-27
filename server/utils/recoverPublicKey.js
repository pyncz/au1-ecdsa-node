import { secp256k1 as secp } from 'ethereum-cryptography/secp256k1'

export const recoverPublicKey = (messageHash, signatureHex, recovery) => {
    const signature = secp.Signature.fromCompact(signatureHex).addRecoveryBit(recovery)
    return signature.recoverPublicKey(messageHash).toRawBytes()
}
