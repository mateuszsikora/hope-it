import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor' },
  message: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
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
