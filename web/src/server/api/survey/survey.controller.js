import Survey from './survey.schema';
import Boom from 'boom';
import jwt from 'jsonwebtoken';

const {config} = require('electrode-confippet');

module.exports = [{
  method: 'POST',
  path: '/api/surveys',
  handler: (request, reply) => {
    new Survey(request.payload).save().then((result) => {
      reply(result).code(201);
    }).catch((err) => {
      throw err;
    });
  }
}, {
  method: 'GET',
  path: '/api/surveys',
  handler: (request, reply) => {
    console.log(request.params.email);
    Survey.find({}).then((result) => {
      reply(result);
    }).catch((err) => {
      throw err;
    });
  }
}, {
  method: 'GET',
  path: '/api/surveys/random',
  handler: async (request, reply) => {
    const to_get = 3;
    const count = await Survey.count()
    const to_skip = Math.max(0, parseInt(Math.random()*(count-to_get)))
    const surveys = await Survey.find().skip(to_skip).limit(to_get);
    console.log('surveys',surveys);
    reply(surveys);
  }
}];
