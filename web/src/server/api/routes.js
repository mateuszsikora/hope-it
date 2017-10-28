import userRotutes from './user/user.controller';
import donorRoutes from './donor/donor.controller';
import paymentRoutes from './payment/payment.controller';
import storyRoutes from './story/story.controller';
import doneeRoutes from './donee/donee.controller';
import messageRoutes from './message/message.controller';

module.exports = [
  ...userRotutes,
  ...donorRoutes,
  ...paymentRoutes,
  ...storyRoutes,
  ...doneeRoutes,
  ...messageRoutes
];
