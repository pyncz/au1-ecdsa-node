import { getAddress } from "@au1/shared/utils/getAddress.js";
import { secp256k1 as secp } from 'ethereum-cryptography/secp256k1'
import server from "./server";
import { useState } from "react";

function Wallet({ address, setAddress, privateKey, setPrivateKey, balance, setBalance }) {
  const [inputError, setInputError] = useState('')

  async function onChange(evt) {    
    const priv = evt.target.value;
    setPrivateKey(priv);
    setInputError('')

    if (priv) {
      try {
        const pub = secp.getPublicKey(priv)
        const addr = getAddress(pub)
        setAddress(addr)
  
        const { data: { balance } } = await server.get(`balance/${addr}`)
        setBalance(balance)
        return
      } catch (e) {
        setInputError(e.message)
      }
    }

    // no privateKey or got an error
    setAddress('')
    setBalance(0)
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Sign transactions with
        <input
          placeholder="Private key"
          value={privateKey}
          required
          onChange={onChange}
        ></input>
        {inputError ? <small>{inputError}</small> : null}
      </label>

      {address
        ? (
          <label>
            Address:
            <div>
              <pre title={address} style={{ cursor: 'help' }}>
                {address.slice(0,6)}...{address.slice(-4)}
              </pre>
            </div>
          </label>
        )
        : null
      }

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
