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
    const description = ''
    const extOrderId = `${Math.random()}`

    console.log(req.body)

    payu.createOrderRequest({
      notifyUrl: `${req.info.host}/api/notify`,
      continueUrl: `${req.info.host}/thankyou`,
      customerIp: '127.0.0.1',
      description,
      currencyCode: 'PLN',
      validityTime: 3600,
      extOrderId,
    }, [{
      name: description,
      unitPrice: req.body.amount * 100,
      quantity: 1
    }], {
      email: req.body.email,
      firstName: 'Jerry',
      lastName: 'Hojny'
    }).on('error', () => {

    }).end(r => {
      if (r.ok || r.status === 302) {
        reply(r.body)
      } else {
        reply(r.body).status(400)
      }
    })
  }
}];
