import Donor from './donor.schema';

module.exports = [{
  method: 'POST',
  path: '/api/donors',
  handler: (request, reply) => {
    Donor.find({deviceId: request.payload.deviceId}).then((result) => {
      if (result.length > 0) {
        return reply(result).code(200);
      }

      new Donor(request.payload).save().then((donor) => {
        reply(donor).code(201);
      }).catch((err) => {
        throw err;
      });
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
