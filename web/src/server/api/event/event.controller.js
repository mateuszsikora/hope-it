import Event from './event.schema';

module.exports = [{
  method: 'POST',
  path: '/api/event',
  handler: (request, reply) => {
    new Event(request.payload).save().then((result) => {
      reply(result).code(201);
    }).catch((err) => {
      throw err;
    });
  }
}, {
  method: 'GET',
  path: '/api/events',
  handler: (request, reply) => {
    Event.find({}).then((result) => {
      reply(result);
    }).catch((err) => {
      throw err;
    });
  }
}];
