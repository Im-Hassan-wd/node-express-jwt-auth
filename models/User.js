const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userScheme = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please anter a valid email']
  },
  password: {
    type: String, 
    required: [true, 'Please enter a password'], 
    minlength: [6, 'Minimum password length is 6 characters']
  }
});

const User = mongoose.model('user', userScheme);

module.exports = User;