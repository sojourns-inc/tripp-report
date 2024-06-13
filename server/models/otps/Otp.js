const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const otpSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  otp: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  }
});

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;