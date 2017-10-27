import User from './api/user/user.schema';

const {config} = require('electrode-confippet');

const verifyOptions = {
  algorithms: ['HS256'],
  ignoreExpiration: false
};

const key = config.secret;

const validateFunc = (decoded, request, callback) => {
  User.findById(decoded.id, '-salt -hashedPassword').then((user) => {
    if (user) {
      return callback(null, true, user);
    }
    return callback(null, false);
}).catch((err)=> {
    throw err
  });
}

module.exports = {
  validateFunc,
  key,
  verifyOptions
};
