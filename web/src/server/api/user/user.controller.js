import User from './user.schema';
import Boom from 'boom';

const {config} = require('electrode-confippet');

module.exports = [{
  method: 'GET',
  path: '/api/users',
  handler: (request, reply) => {
    User.find({}, '-salt -hashedPassword').then((users) => {
      reply(users);
    }).catch((err) => {
      throw err;
    });
  },
  config: {
    auth: 'jwt'
  }
}, {
  method: 'POST',
  path: '/api/users',
  handler: (request, reply) => {
    const newUser = new User(request.payload);
      newUser.save().then((user) => {
        const token = jwt.sign({id: user._id}, config.secret, {expiresIn: 60 * 5});
      reply({token}).code(201);
    }).catch((err) => {
        throw err;
    });
  }
}, {
  method: 'GET',
  path: '/api/users/me',
  handler: (request, reply) => {
    const {_id} = request.auth.credentials;
    User.findOne({_id}, '-salt -hashedPassword').then((user) => {
      reply(user);
    }).catch((err) => {
        throw err;
    });
  },
  config: {
    auth: 'jwt'
  }
}, {
  method: 'POST',
  path: '/api/login',
  handler: (request, reply) => {
    const credentials = request.payload;

    User.findOne({email: credentials.email})
      .then((user) => {
      if (!user) {
        return reply(Boom.unauthorized('Email or Password invalid'));
      }

      if (!user.authenticate(credentials.password)) {
        return reply(Boom.unauthorized('Email or Password invalid'));
      }

      const token = jwt.sign({id: user._id}, config.secret, {expiresIn: 60 * 60 * 5});

      reply({token});
    })
    .catch((err) => {
        reply(Boom.badImplementation(err.message));
    });
  }
}];
