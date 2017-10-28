import Payment from './payment.schema';
import Donor from './../donor/donor.schema';

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
    console.log(request.params.email);
    Payment.find({}).populate('donor').populate('message').then((result) => {
      reply(result);
    }).catch((err) => {
      throw err;
    });
  }
}, {
  method: 'GET',
  path: '/api/payments/{email}',
  handler: async (request, reply) => {
    const donor = await Donor.findOne({ email: request.params.email });
    if (!donor){
      reply([]);
    }
    const payments = Payment.find({ donor: donor._id }).populate('donor').populate('message');
    reply(payments);
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
