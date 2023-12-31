const mongoose = require("mongoose");

const Profile = mongoose.model("Profile", {
  username: {
    type: String,
    required: true,
    unique: true
  },
  profileImageFull: String,
  profileImageCropped: String,
  body: String,
  sortOrder: Number
});

module.exports = Profile;
