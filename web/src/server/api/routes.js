import userRotutes from './user/user.controller';
import donorRoutes from './donor/donor.controller';
import paymentRoutes from './payment/payment.controller';
import messageRoutes from './message/message.controller';
import surveyRoutes from './survey/survey.controller';
import answearRoutes from './answear/answear.controller';

module.exports = [
  ...userRotutes,
  ...donorRoutes,
  ...paymentRoutes,
  ...messageRoutes,
  ...surveyRoutes,
  ...answearRoutes
];
