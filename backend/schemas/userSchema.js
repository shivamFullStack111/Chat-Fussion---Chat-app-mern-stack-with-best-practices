const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  isVarified: {
    type: Boolean,
    default: false,
  },
  otpData: {
    type: Object,
  },
});

const Users = mongoose.model("user", userSchema);

module.exports = Users;
