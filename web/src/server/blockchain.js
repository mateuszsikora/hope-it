// (kovan)
const address = '0x571Ae5AF70D4720D2Ae62c0B9A4c4E950772Bf13'
const contractAbi = require('../../../contracts/token.json')

import Api from '@parity/api'

const api = new Api(new Api.Provider.Http('https://kovan.infura.io'))

const contract = api.newContract(contractAbi, address)

function getBlock() {
  return api.eth.blockNumber()
}

function getLogs() {
  return getBlock()
    .then(block => {
      return contract
        .instance
        .TokenCreated
        .getAllLogs({
          address,
          fromBlock: block - 10,
          toBlock: 'latest'
        })
    })
}

// Monitor the blockchain for incoming payments

setInterval(() => {
  getLogs().then(logs => {
    logs.forEach(log => {
      console.log(log)
      new Payment({
        amount: 300 * 3.6 * 100,
        status: 'done'
      }).save().then(() => {
        console.log('Blockchain transaction registered.')
      }).catch(err => {
        console.error('Error inserting blockchain transaction', err)
      })
    })
  })
}, 5000)
