import Payment from './payment.schema';

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
}];
