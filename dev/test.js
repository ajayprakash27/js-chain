const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();

const bc1 = {
    "chain": [
    {
    "index": 1,
    "timestamp": 1544364236476,
    "transactions": [],
    "nonce": 100,
    "hash": "0",
    "previousBlockHash": "0"
    },
    {
    "index": 2,
    "timestamp": 1544364247469,
    "transactions": [],
    "nonce": 18140,
    "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
    "previousBlockHash": "0"
    },
    {
    "index": 3,
    "timestamp": 1544364368526,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "44b1a8b0fbbb11e89f6deb35e4eac87d",
    "transactionId": "4b561930fbbb11e89f6deb35e4eac87d"
    },
    {
    "amount": 100,
    "sender": "Bob",
    "recipient": "Alice",
    "transactionId": "87b78e90fbbb11e89f6deb35e4eac87d"
    },
    {
    "amount": 120,
    "sender": "Bob",
    "recipient": "Alice",
    "transactionId": "8b289970fbbb11e89f6deb35e4eac87d"
    },
    {
    "amount": 16000,
    "sender": "Bob",
    "recipient": "Alice",
    "transactionId": "8ef9ecc0fbbb11e89f6deb35e4eac87d"
    }
    ],
    "nonce": 70311,
    "hash": "0000a2353b9cfa0f0bce228cf38026b0d92758cf0a9ae80c975574cd611e52bc",
    "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
    },
    {
    "index": 4,
    "timestamp": 1544364380561,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "44b1a8b0fbbb11e89f6deb35e4eac87d",
    "transactionId": "9368dfa0fbbb11e89f6deb35e4eac87d"
    }
    ],
    "nonce": 15859,
    "hash": "000058e41981b941de4907e597c40530e933d23d3b4365aff7a721901b0dbed4",
    "previousBlockHash": "0000a2353b9cfa0f0bce228cf38026b0d92758cf0a9ae80c975574cd611e52bc"
    },
    {
    "index": 5,
    "timestamp": 1544364409883,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "44b1a8b0fbbb11e89f6deb35e4eac87d",
    "transactionId": "9a948180fbbb11e89f6deb35e4eac87d"
    },
    {
    "amount": 12321,
    "sender": "Bob",
    "recipient": "Alice",
    "transactionId": "a4df16a0fbbb11e89f6deb35e4eac87d"
    },
    {
    "amount": 11231221,
    "sender": "Bob",
    "recipient": "Alice",
    "transactionId": "a822f700fbbb11e89f6deb35e4eac87d"
    }
    ],
    "nonce": 92338,
    "hash": "0000a1ba075b2deed82c79ff823bce4ad04de579276e9505c19a93cecce01b90",
    "previousBlockHash": "000058e41981b941de4907e597c40530e933d23d3b4365aff7a721901b0dbed4"
    }
    ],
    "pendingTransactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "44b1a8b0fbbb11e89f6deb35e4eac87d",
    "transactionId": "ac0e8910fbbb11e89f6deb35e4eac87d"
    }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
    }

console.log( 'VALID:', bitcoin.chainIsValid(bc1.chain));