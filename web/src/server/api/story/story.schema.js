import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
  donee: { type: mongoose.Schema.Types.ObjectId, ref: 'Donee' },
  message: String
});

module.exports = mongoose.model('Story', StorySchema);
