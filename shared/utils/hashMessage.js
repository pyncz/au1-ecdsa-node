import { keccak256 } from 'ethereum-cryptography/keccak'
import { utf8ToBytes } from 'ethereum-cryptography/utils'

export const hashMessage = (message) => {
    const bytes = typeof message === 'string' ? utf8ToBytes(message) : message
    return keccak256(bytes)
}
