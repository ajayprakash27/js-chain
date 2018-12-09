const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];
const uuid = require('uuid/v1');

function Blockchain() {
    // All of the blocks that we mine/create will be stored in this array
    this.chain = [];
    // This is where we hold all the new transactions in a block before we mine
    this.pendingTransactions = [];
    //setting up awareness of nodes
    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = [];
    // The Genesis Block inside our blockchain
    this.createNewBlock(100,'0','0');
};

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
    //this is what is storing all our data
    const newBlock = {
        //basically the block number
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.pendingTransactions,
        // it's to do with the PoW, a proof that we created this new block in a legitimate way using a PoW method
        nonce: nonce,
        // all our transactions will be compressed into a single hash
        hash: hash,
        previousBlockHash: previousBlockHash
    };

    //clear out our newTransactions array for the next block
    this.pendingTransactions = [];
    //adds the new block to the chain
    this.chain.push(newBlock);

    return newBlock;
};

Blockchain.prototype.getLastBlock = function() {
    return this.chain[this.chain.length-1];
};

Blockchain.prototype.createNewTransaction = function(amount, sender, recipient) {
    const newTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient,
        transactionId: uuid().split('-').join('')
    };

    return newTransaction;
}

Blockchain.prototype.addTransactionToPendingTransactions = function(transactionObj) {
    this.pendingTransactions.push(transactionObj);
    return this.getLastBlock()['index'] + 1;
};

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
    // Pass the block's data and return a fixed length strength aka the hash of the block
    //The parameters are the data that we will be hashing, which is essntially hashing a block

    // Converting all the parameters into 1 string so we can hash it. The JSON stringify converts the array into a single string
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    // using the sha256 algorithm to has these variables
    const hash = sha256(dataAsString);
    return hash;
};

Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData) {
    // => repeatedly hash block until it finds correct hash => '0000JJDUWU218E8EN192E'
    // => uses current block data for the hash, but also the previousBlockHash
    // => continuously changes nonce value until it finds the correct hash
    // => returns to us the nonce value that creates the correct hash
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData,  nonce);
    while (hash.substring(0,4) != '0000') {
        nonce++;
        hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }

    return nonce;
};

Blockchain.prototype.chainIsValid = function(blockchain) {
    
};

module.exports = Blockchain;