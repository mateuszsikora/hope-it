import User from '../api/user/user.schema';

module.exports = () => {
  User.find({}).remove(() => {
    User.create({
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, {
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    }, (err) => {

      console.log('finished populating users',err);
    });
  });
}
