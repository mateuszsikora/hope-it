import Answear from './answear.schema';
import Boom from 'boom';
import jwt from 'jsonwebtoken';

const {config} = require('electrode-confippet');

module.exports = [{
  method: 'POST',
  path: '/api/answears',
  handler: (request, reply) => {
    new Answear(request.payload).save().then((result) => {
      reply(result).code(201);
    }).catch((err) => {
      throw err;
    });
  }
}, {
  method: 'GET',
  path: '/api/answears',
  handler: (request, reply) => {
    console.log(request.params.email);
    Answear.find({}).populate('survey').then((result) => {
      reply(result);
    }).catch((err) => {
      throw err;
    });
  }
}];
