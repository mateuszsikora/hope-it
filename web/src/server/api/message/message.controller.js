import Message from './message.schema';

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
    handler: (request, reply) => {
      Message.find({})
          .populate('doner')
          .populate('donee')
          .then((result) => {
              reply(result);
      }).catch((err) => {
        throw err;
      });
    }
}];
