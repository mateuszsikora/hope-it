import mongoose from 'mongoose';
import crypto from 'crypto';

const AnswearSchema = new mongoose.Schema({
  survey: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey' },
  answear: Boolean,
});

module.exports = mongoose.model('Answear', AnswearSchema);
