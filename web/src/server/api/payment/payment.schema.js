import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor' },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  date: {
    type: Date,
    default: Date.now
  },
  amount: Number,
  status: {
    type: String,
    default: 'done'
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);
