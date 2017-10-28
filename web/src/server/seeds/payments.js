import Payment from '../api/payment/payment.schema';
import Donor from '../api/donor/donor.schema';
import moment from 'moment';
import Event from '../api/event/event.schema';

module.exports = async () => {
  const donors = await Donor.find({});
  const event = await Event.find({});
  await Payment.find({}).remove();
  await Payment.create([{
    donor: donors[0]._id,
    event: event[0]._id,
    amount: 100000
  }, {
    donor: donors[1]._id,
    amount: 500,
    date: moment().subtract(2, 'month'),
    event: event[0]._id,
  }, {
    donor: donors[1]._id,
    amount: 900,
    event: event[1]._id,
  }, {
    donor: donors[0]._id,
    amount: 1500,
    date: moment().subtract(2, 'month'),
    event: null,
  }]);
  console.log('finished populating payments');
};
