import userRotutes from './user/user.controller';
import donorRoutes from './donor/donor.controller';

module.exports = [
  ...userRotutes,
  ...donorRoutes
];
