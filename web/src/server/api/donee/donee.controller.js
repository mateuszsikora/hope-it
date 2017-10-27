import Donee from './donee.schema';

module.exports = [{
  method: 'POST',
  path: '/api/donees',
  handler: (request, reply) => {
    new Donee(request.payload).save().then((donor) => {
      reply(donor).code(201);
    }).catch((err) => {
      throw err;
    });
  }
}, {
  method: 'GET',
    path: '/api/donees',
    handler: (request, reply) => {
    Donee.find({}).then((donors) => {
      reply(donors);
  }).catch((err) => {
      throw err;
  });
  }
}];
