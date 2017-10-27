import Donee from './donee.schema';

module.exports = [{
  method: 'POST',
  path: '/api/donees',
  handler: (request, reply) => {
    new Donee(request.payload).save().then((donee) => {
      reply(donee).code(201);
    }).catch((err) => {
      throw err;
    });
  }
}, {
  method: 'GET',
    path: '/api/donees',
    handler: (request, reply) => {
    Donee.find({}).then((donees) => {
      reply(donees);
  }).catch((err) => {
      throw err;
  });
  }
}];
