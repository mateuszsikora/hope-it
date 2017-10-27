import mongoose from 'mongoose';

const DoneeSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Donee', DoneeSchema);
