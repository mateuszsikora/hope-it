import userRotutes from './user/user.controller';
import donorRoutes from './donor/donor.controller';
import paymentRoutes from './payment/payment.controller';

module.exports = [
  ...userRotutes,
  ...donorRoutes,
  ...paymentRoutes
];
