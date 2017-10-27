import mongoose from 'mongoose';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
  salt: String,
  hashedPassword: String,
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  }
});

const validatePresenceOf = value => value && value.length;

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema
  .virtual('profile')
  .get(function () {
    return {
      'name': this.name,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function () {
    return {
      '_id': this._id
    };
  });

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(function (email) {
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function (hashedPassword) {
    return hashedPassword.length;
  }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function (value, respond) {
    this.constructor.findOne({email: value}, (err, user) => {
      if (err) {
        throw err;
      }
      if (user) {
        if (this.id === user.id) {
          return respond(true);
        }
        return respond(false);
      }
      respond(true);
  });
  }, 'The specified email address is already in use.');

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function (next) {
    if (!this.isNew) {
      return next();
    }

    if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1) {
      next(new Error('Invalid password'));
    } else {
      next();
    }
  });

UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function () {
  const salt = crypto.randomBytes(16);
  return salt.toString('base64');
},

/**
 * Encrypt password
 *
 * @param {String} password
 * @return {String}
 * @api public
 */
encryptPassword: function (password) {
  if (!password || !this.salt) {
    return '';
  }
  const salt = new Buffer(this.salt, 'base64');
  const encrypted = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512');
  return encrypted.toString('base64');
}
};

module.exports = mongoose.model('User', UserSchema);
