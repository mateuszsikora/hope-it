import Payment from '../api/payment/payment.schema';
import Donor from '../api/donor/donor.schema';
import moment from 'moment';

module.exports = async () => {
  const donors = await Donor.find({});
  await Payment.find({}).remove();
  await Payment.create([{
      donor: donors[0]._id,
      amount: 1213.32,
      event: null
    },{
      donor:  donors[1]._id,
      amount: 13.32,
      event: null
    },{
      donor:  donors[0]._id,
      amount: 113.32,
      event: 'super akcja'
    },{
      donor:  donors[0]._id,
      amount: 1.52,
      date: moment().subtract(2, 'month'),
      event: 'super akcja'
    },{
      donor:  donors[0]._id,
      amount: 112.32,
      date: moment().subtract(3, 'month'),
      event: 'super akcja'
    }]);
    console.log('finished populating payments');
}
