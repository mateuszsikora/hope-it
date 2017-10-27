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
    }, () => {
      console.log('finished populating users');
    });
  });
}
