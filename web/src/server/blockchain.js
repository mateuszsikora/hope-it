// (kovan)
const address = '0x571Ae5AF70D4720D2Ae62c0B9A4c4E950772Bf13'
const contractAbi = require('../../../contracts/token.json')

import Api from '@parity/api'

import Payment from './api/payment/payment.schema'

// const api = new Api(new Api.Provider.Http('https://kovan.infura.io'))
const api = new Api(new Api.Provider.Http('http://localhost:8545'))

const contract = api.newContract(contractAbi, address)

function getBlock() {
  return api.eth.blockNumber()
}

function getLogs(lastBlock, block) {
  const event = contract
    .events
    .find(ev => ev.name === 'TokenCreated');
  const filter = contract._getFilterOptions(event, {
      fromBlock: Math.max(lastBlock, block - 10),
      toBlock: 'latest'
  });

  return api.eth.getLogs(filter)
}

// Monitor the blockchain for incoming payments

let lastBlock = 0
setInterval(() => {
  getBlock().then(block => {
    const prev = lastBlock;
    lastBlock = block
    return getLogs(prev, block)
  }).then(logs => {
    logs.forEach(log => {
      Payment.findOneAndUpdate({
        txId: log.transactionHash
      }, {
        amount: 300 * 3.6 * 100,
        status: 'done',
        txId: log.transactionHash
      }, {
        upsert: true
      }).then(() => {
        console.log('Blockchain transaction registered.', log)
      }).catch(err => {
        console.error('Error inserting blockchain transaction', err)
      })
    })
  }).catch(err => {
    console.error(err)
  })
}, 5000)
