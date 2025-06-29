const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: { type: Boolean, default: false },
  isDoctor: { type: Boolean, default: false },
  notification: { type: Array, default: [] }
});

module.exports = mongoose.model("User", userSchema);
