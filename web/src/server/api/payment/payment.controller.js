import Payment from './payment.schema';

import Payu from '../../payu'

const payu = Payu.test

module.exports = [{
  method: 'POST',
  path: '/api/payments',
  handler: (request, reply) => {
    new Payment(request.payload).save().then((result) => {
      reply(result).code(201);
    }).catch((err) => {
      throw err;
    });
  }
}, {
  method: 'GET',
    path: '/api/payments',
    handler: (request, reply) => {
      Payment.find({}).populate('donor').then((result) => {
        reply(result);
      }).catch((err) => {
        throw err;
      });
    }
}, {
  method: 'POST',
  path: '/api/payments/payu',
  handler(req, reply) {
    const description = 'Dotacja'
    const extOrderId = `${Math.random()}`

    const { host } = req.info
    const { amount, email } = req.payload

    payu.createOrderRequest({
      notifyUrl: `http://${host}/api/notify`,
      continueUrl: `http://${host}/thankyou`,
      customerIp: '127.0.0.1',
      description,
      currencyCode: 'PLN',
      validityTime: 3600,
      extOrderId,
    }, [{
      name: description,
      unitPrice: `${amount * 100}`,
      quantity: '1'
    }], {
      email: email,
      firstName: 'Jerry',
      lastName: 'Hojny'
    }).then(r => {
      if (r.status === 200 || r.status === 302) {
        console.log(r)
        reply(r.data)
      } else {
        reply(r.data).code(400)
      }
    }).catch(err => {
      const r = err.response
      if (r.status === 200 || r.status === 302) {
        reply(r.data)
      } else {
        reply(r.data).code(400)
      }
    })
  }
}];
