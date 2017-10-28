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
},
{
  method: 'POST',
  path: '/api/payments/notify',
  async handler(req, reply) {
    const { order } = req.payload
    if (order.status === 'COMPLETED') {
      const payment = await Payment.findById(order.extOrderId)
      if (!payment) {
        return reply().code(404)
      }

      payment.status = 'done'
      await payment.save()
    }

    return reply()
  }
},
{
  method: 'POST',
  path: '/api/payments/payu',
  async handler(req, reply) {
    const { amount, email, event = '' } = req.payload
    const donor = null
    const description = 'Dotacja'

    const { host } = req.info

    try {
      const payment = await new Payments({
        donor,
        amount: amount * 100,
        event,
        status: 'waiting'
      }).save()

      const r = await payu.createOrderRequest({
        notifyUrl: `http://${host}/api/payments/notify`,
        continueUrl: `http://${host}/thankyou`,
        customerIp: '127.0.0.1',
        description,
        currencyCode: 'PLN',
        validityTime: 3600,
        extOrderId: payment._id,
      }, [{
        name: description,
        unitPrice: `${amount * 100}`,
        quantity: '1'
      }], {
        email: email,
        firstName: 'Jerry',
        lastName: 'Hojny'
      })
      if (r.status === 200 || r.status === 302) {
        reply(r.data)
      } else {
        payment.status = 'failed'
        await payment.save()
        reply(r.data).code(400)
      }
    } catch (err) {
      const r = err.response
      if (r.status === 200 || r.status === 302) {
        reply(r.data)
      } else {
        payment.status = 'failed'
        await payment.save()
        reply(r.data).code(400)
      }
    }
  }
}];
