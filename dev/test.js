const Blockchain = require('./blockchain');
const ajchain = new Blockchain();

//--- GENESIS BLOCK

console.log(ajchain)


//--- TESTING HASHBLOCK
// const previousBlockHash = 'NNDAUWD8H83N4RD8E7EDN381D';
// const currentBlockData = [
//     {
//         amount: 10,
//         sender: '8J83EU198DH91N99N2',
//         recipient: 'DADW81N9DX1W8D1WD1'
//     },
//     { 
//         amount: 50,
//         sender: 'DAW138E1NNEN13E1',
//         recipient: '98H9N237H2NDI3ND' 
//     },
//     { 
//         amount: 1000,
//         sender: 'DAW138E1NNEN13E1A',
//         recipient: '98H9N237H2NDI3ND' 
//     }
// ];

// console.log(ajchain.hashBlock(previousBlockHash, currentBlockData, 31951))

// console.log(ajchain.proofOfWork(previousBlockHash, currentBlockData));
