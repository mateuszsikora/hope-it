import Payment from '../api/payment/payment.schema';
import Donor from '../api/donor/donor.schema';
import Event from '../api/event/event.schema';

module.exports = async () => {
  const donors = await Donor.find({});
  const event = await Event.find({});
  await Payment.find({}).remove();
  await Payment.create([{
    donor: donors[0]._id,
    event: event[0]._id,
    amount: 100000,
    status: 'done'
  }, {
    donor: donors[1]._id,
    event: event[0]._id,
    amount: 500,
    status: 'done'
  }, {
    donor: donors[1]._id,
    event: event[1]._id,
    amount: 900,
    status: 'done'
  }, {
    donor: donors[0]._id,
    amount: 1500,
    event: null,
    status: 'done'
  }]);
  console.log('finished populating payments');
};
