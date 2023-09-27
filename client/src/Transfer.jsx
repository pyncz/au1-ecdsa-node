import { useState } from "react";
import server from "./server";
import { signMessage } from "./utils";

function Transfer({ sender, privateKey, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const data = {
        amount: parseInt(sendAmount),
        recipient,
      }
      const { signature, recovery } = signMessage(JSON.stringify(data), privateKey)

      const {
        data: { balance },
      } = await server.post(`send`, {
        sender,
        data,
        signature,
        recovery,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          required
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
          required
        ></input>
      </label>

      <button type="submit">
        Transfer
      </button>
    </form>
  );
}

export default Transfer;
