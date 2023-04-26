// Define User schema
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  followers: [mongoose.Schema.Types.ObjectId],
  followings: [mongoose.Schema.Types.ObjectId],
});

// Define User model
const User = mongoose.model('User', userSchema);

module.exports = User;
