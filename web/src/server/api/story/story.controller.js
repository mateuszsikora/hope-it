import Story from './story.schema';

module.exports = [{
  method: 'POST',
  path: '/api/stories',
  handler: (request, reply) => {
    new Story(request.payload).save().then((result) => {
      reply(result).code(201);
    }).catch((err) => {
      throw err;
    });
  }
}, {
  method: 'GET',
    path: '/api/stories',
    handler: (request, reply) => {
      Story.find({}).populate('donee').then((result) => {
        reply(result);
      }).catch((err) => {
        throw err;
      });
    }
}];
