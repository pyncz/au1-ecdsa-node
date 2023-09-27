import express from 'express'
import cors from 'cors'
import { verifySignature } from './utils/verifySignature.js';
import { hashMessage } from '@au1/shared/utils/hashMessage.js';

const app = express();
const port = 3042;

app.use(cors());
app.use(express.json());

// NOTE: Use client's `npm run gen` to generate a new private / public key pair
const balances = {
  "39e8d9cd1161dd515255db740d0649f84dea1e01": 100, // priv: 23b13f371c9ced59d46d05b5df3ac33c69d6ab7c791823f908e0aa7eb81615a1
  "30c0361d795f0fc31533e082bb83ae996521ea40": 50, // priv: 938654025b0fc159a8fa21b783774e87e22f6c497e53cac9831f9fce65bc2221
  "6a1550bdd98f14cbb86913e1b790f972726ca2e0": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, data, signature, recovery } = req.body

  if (!verifySignature(sender, hashMessage(JSON.stringify(data)), signature, recovery)) {
    res.status(400).send({ message: "Invalid signature!" })
    return
  }

  const { recipient, amount } = data

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
