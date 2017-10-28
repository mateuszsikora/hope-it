import Message from './message.schema';
import Payment from '../payment/payment.schema';


module.exports = [{
  method: 'POST',
  path: '/api/messages',
  handler: (request, reply) => {
    new Message(request.payload).save().then((result) => {
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
        console.log(payments.map(p=>p.message))
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
