const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String, 
    required: true, 
    minlength: 6
  }
});

const User = mongoose.model('user', userScheme);

module.exports = User;