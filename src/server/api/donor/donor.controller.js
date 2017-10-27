import Donor from './donor.schema';

module.exports = [{
  method: 'POST',
  path: '/api/donors',
  handler: (request, reply) => {
    new Donor(request.payload).save().then((donor) => {
      reply(donor).code(201);
    }).catch((err) => {
      throw err;
    });
  }
}, {
  method: 'GET',
    path: '/api/donors',
    handler: (request, reply) => {
    Donor.find({}).then((donors) => {
      reply(donors);
  }).catch((err) => {
      throw err;
  });
  }
}];
