const express = require('express');
const router = express.Router();
const config = require ('../../../nuxt.config.js');

const API_Error = require('../ApiError');

const User = require('../users/User');
const Otp = require('./Otp');

const { isValidObjectId } = require('mongoose');

router.post('/verifyCode', async (req, res, next) => {
  const { email, otp } = req.body;

  try {
      if (!email || !otp) throw API_Error('VERIFY_ERROR', 'Email and OTP code are required.');

      // Find the user by email
      const user = await User.findOne({ email: email });
      if (!user) {
          throw API_Error('VERIFY_ERROR', 'User not found.');
      }

      // Find the OTP record using the user's ID
      const otpRecord = await Otp.findOne({ userId: user._id, otp });

      // Check if the OTP record exists
      if (!otpRecord) {
          throw API_Error('VERIFY_ERROR', 'Invalid OTP.');
      }

      // Check if the OTP is expired
      const currentTime = new Date();
      if (currentTime > otpRecord.expiresAt) {
          throw API_Error('VERIFY_ERROR', 'OTP has expired.');
      }

      // OTP is valid, update the user's verification status
      user.verificationStatus = 'verified';
      await user.save();

      res.status(200).send({ message: 'Email verified successfully.' });
  } catch (err) {
      res.status(500).send({ message: err.message });
  }
});

module.exports = router;