import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  donors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Donor' }],
  type: String, //'funding'|'promo'|'message'
  startDate: { //funding
    type: Date,
    default: Date.now
  },
  endDate: Date, //funding
  date: Date, // promo | message
  goal: Number,
  raised: Number,
  title: String,
  content: String,
  shortContent: String,
  venue: String,
  location: { lat: Number, lng: Number},
  discount: Number,
  donated: Number,
  image: String,
  supporters: Number
});

module.exports = mongoose.model('Message', MessageSchema);
