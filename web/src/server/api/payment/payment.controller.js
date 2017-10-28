import Payment from './payment.schema';
import Donor from './../donor/donor.schema';

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
}];
