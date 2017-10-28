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
    Payment.find({}).populate('donor').populate('event').then((result) => {
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
    const payments = Payment.find({ donor: donor._id }).populate('donor').populate('event');
    reply(payments);
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
    const { amount, email, event } = req.payload
    const ev = event || ''
    const donor = null
    const description = 'Dotacja'

    const { host } = req.info

    let payment = null
    try {
      payment = await new Payment({
        donor,
        amount: amount * 100,
        event: ev,
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
      console.error(err)
      const r = err.response
      if (r && r.status === 200 || r.status === 302) {
        reply(r.data)
      } else {
        if (payment) {
          payment.status = 'failed'
          await payment.save()
        }
        reply(r ? r.data : err).code(400)
      }
    }
  }
}];
