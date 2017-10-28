import Message from './message.schema';
import Payment from '../payment/payment.schema';
import Donor from '../donor/donor.schema';
import fcm from '../../fcm';

const titles = {
  funding: 'Pilnie potrzebna Twoja pomoc!',
  message: 'Spójrz jak zmieniasz świat!',
  promo: 'Mamy coś specjalnie dla Ciebie!'
};

module.exports = [{
  method: 'POST',
  path: '/api/messages',
  handler: (request, reply) => {
    const savePromise = new Message(request.payload).save()
    const findPromise = Donor.find({_id: {$in: [request.payload.donors]}});
    Promise.all([savePromise, findPromise]).then(([result, donors]) => {
      donors.forEach(donor => {
        fcm(titles[request.payload.type], request.payload.title, donor.deviceId);
      });
      reply(result).code(201);
    }).catch((err) => {
      throw err;
    });
  }
}, {
  method: 'GET',
    path: '/api/messages',
    handler: async (request, reply) => {
      try{
        const payments = await Payment.find()
        const messages = await Message.find({}).populate('donors')
        const updated = await Promise.all(
            messages.map( async message=>{
                  if(message.type == 'funding'){
                    console.log(message._id)
                    message.supporters = payments.filter(p=>(p.message+"") == (message._id+"")).length
                  }
                  return message;
            })
          )

          reply(updated);
        } catch(err){
          console.log(err)
          throw err;
        };
      }

}];
