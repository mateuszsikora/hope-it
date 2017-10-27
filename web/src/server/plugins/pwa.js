import hapiAuthJWT from 'hapi-auth-jwt2';
import mongoose from 'mongoose';
import routes from '../api/routes';
import seed from '../seeds';
import auth from '../auth';

const {config} = require('electrode-confippet');

/*eslint-env es6*/
const plugin = {};
const url = `mongodb://${config.mongodb.host}:${config.mongodb.port}/hopeit`;

plugin.register = function (server, options, next) {

  const jwt = new Promise((resolve, reject) => {
    server.register(hapiAuthJWT, (err) => {
      if(err) {
        reject(err)
      }
      resolve();
    });
  });

  const mongo = mongoose.connect(url);

  Promise.all([
    jwt,
    mongo
  ]).then(() => {
    server.auth.strategy('jwt', 'jwt', false, auth);
    if (config.env === 'dev') {
      seed();
    }
    server.route(routes);
  }).catch((err) => {
    console.error(err)
    throw err;
  });

  server.route({
    method: 'GET',
    path: '/sw.js',
    handler: {
      file: 'dist/sw.js'
    }
  });
  next();
};

plugin.register.attributes = {
  name: 'PWAPlugin',
  version: '0.0.1'
};

module.exports = plugin;
