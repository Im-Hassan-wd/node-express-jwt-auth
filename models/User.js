const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String, 
    required: [true, 'Please enter a pasword'], 
    minlength: [6, 'Minimum password length is 6 characters']
  }
});

const User = mongoose.model('user', userScheme);

module.exports = User;