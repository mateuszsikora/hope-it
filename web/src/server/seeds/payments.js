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
    mesages: mesages[0]._id,
    amount: 100000
  }, {
    donor: donors[1]._id,
    amount: 500,
    date: moment().subtract(2, 'month').toDate(),
    mesages: mesages[0]._id,
  }, {
    donor: donors[1]._id,
    amount: 900,
    mesages: mesages[1]._id,
  }, {
    donor: donors[0]._id,
    amount: 1500,
    date: moment().subtract(2, 'month').toDate(),
    mesages: null,
  }]);
  console.log('finished populating payments');
};
