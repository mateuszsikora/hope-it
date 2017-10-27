import mongoose from 'mongoose';

const DonorSchema = new mongoose.Schema({
  email: String,
  deviceId: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('Donor', DonorSchema);
