import Payment from '../api/payment/payment.schema';
import Donor from '../api/donor/donor.schema';
import moment from 'moment';
import Message from '../api/message/message.schema';

module.exports = async () => {
  const donors = await Donor.find({});
  const mesages = await Message.find({});
  await Payment.find({}).remove();
  await Payment.create([{
    donor: donors[0]._id,
    message: mesages[0]._id,
    amount: 100000
  }, {
    donor: donors[1]._id,
    amount: 5000,
    date: moment().subtract(2, 'month').toDate(),
    message: mesages[0]._id,
  }, {
    donor: donors[1]._id,
    amount: 9000,
    message: mesages[4]._id,
  }, {
    donor: donors[0]._id,
    amount: 1500,
    date: moment().subtract(2, 'month').toDate(),
    message: null,
  }, {
    donor: donors[1]._id,
    amount: 50000,
    message: mesages[3]._id,
  }, {
    donor: donors[1]._id,
    amount: 32000,
    message: mesages[3]._id,
  }, {
    donor: donors[1]._id,
    amount: 29000,
    message: mesages[5]._id,
  }]);
  console.log('finished populating payments');
};
