import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  title: String,
  description: String,
  isActive: {
    type: Boolean,
    default: true
  },
  image: String //hmm?
});

module.exports = mongoose.model('Event', EventSchema);
