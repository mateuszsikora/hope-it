import hapiAuthJWT from 'hapi-auth-jwt2';
import mongoose from 'mongoose';
import routes from '../api/routes';
import seed from '../seeds';
import auth from '../auth';
import fcm from '../fcm';
const {config} = require('electrode-confippet');
fcm('','', 'f2aEp28jWCk:APA91bGzdZyDran1XjsN2UDwdWbCFoPECySz74uN4tsNrJOoLS7vgmnxn7Zt4XiKSSQ-yD0ucs6DfzGh-VQFsCgsUWsvprc-I1Fe4KSSs6xA8P8Tg_lm8HsPNezlRrSQNzKrQZyxo6Eo')
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
