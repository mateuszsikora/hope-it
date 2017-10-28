import mongoose from 'mongoose';
import crypto from 'crypto';

const SurveySchema = new mongoose.Schema({
  question: String,
  pool: String,
  image: String
});

module.exports = mongoose.model('Survey', SurveySchema);
