import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  doner: { type: mongoose.Schema.Types.ObjectId, ref: 'Donee' },
  donee: { type: mongoose.Schema.Types.ObjectId, ref: 'Doner' },
  message: String
});

module.exports = mongoose.model('Message', MessageSchema);
