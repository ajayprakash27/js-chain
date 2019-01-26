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
    let validChain = true;
    
    for (var i=1; i< blockchain.length; i++) {
        const currentBlock = blockchain[i];
        const prevBlock = blockchain[i-1];
        const blockHash = this.hashBlock(prevBlock['hash'], {transactions: currentBlock['transactions'], index: currentBlock['index'] }, currentBlock['nonce'] );
        if (currentBlock['previousBlockHash'] !== prevBlock['hash']) validChain = false;
        if (blockHash.substring(0,4) !== '0000') validChain = false;
    }

    const genesisBlock = blockchain[0];
    const correctNonce = genesisBlock['nonce'] === 100;
    const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
    const correctHash = genesisBlock['hash'] === '0';
    const correctTransactions = genesisBlock['transactions'].length === 0;
    
    if(!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) validChain = false;

    return validChain;
};

Blockchain.prototype.getBlock = function(blockHash) {
    let correctBlock = null;
    this.chain.forEach(block => {
        if (block.hash === blockHash) correctBlock = block;
    });
    return correctBlock;
};

Blockchain.prototype.getTransaction = function(transactionId) {
    let correctTransaction = null;
    let correctBlock = null;
    this.chain.forEach(block => {
        block.transactions.forEach(transaction => {
            if(transaction.transactionId === transactionId) {
                correctTransaction = transaction;
                correctBlock = block;
            };
        });
    });
    return {
        transaction: correctTransaction,
        block: correctBlock
    };
};

Blockchain.prototype.getAddressData = function(address) {
    const addressTransactions = [];
    this.chain.forEach(block => {
        block.transactions.forEach(transaction => {
            if(transaction.sender === address || transaction.recipient === address) {
                addressTransactions.push(transaction);
            };
        });
    });

    let balance = 0;
    addressTransactions.forEach(transaction => {
        if (transaction.recipient === address) balance += transaction.amount;
        else if (transaction.sender === address) balance -= transaction.amount;
    });

    return {
        addressTransactions: addressTransactions,
        addressBalance: balance
    };
};

module.exports = Blockchain;