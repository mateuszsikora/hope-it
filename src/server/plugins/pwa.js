import mongoose from 'mongoose';
import routes from '../api/routes';
import seed from '../seeds';

/*eslint-env es6*/
const plugin = {};
const url = `mongodb://localhost:27017/hopeit`;

plugin.register = function (server, options, next) {
  mongoose.connect(url).then(() => {
    seed();
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

  server.route(routes);


  next();
};

plugin.register.attributes = {
  name: 'PWAPlugin',
  version: '0.0.1'
};

module.exports = plugin;
