import { secp256k1 as secp } from 'ethereum-cryptography/secp256k1'
import { toHex } from 'ethereum-cryptography/utils'
import { getAddress } from '@au1/shared/utils/getAddress.js'

const privateKey = secp.utils.randomPrivateKey()
const publicKey = secp.getPublicKey(privateKey)

console.log(`privateKey: ${toHex(privateKey)}`)
console.log(`publicKey: ${toHex(publicKey)}`)
console.log(`address: ${getAddress(publicKey)}`)
