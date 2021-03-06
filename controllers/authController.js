const User = require('../models/User');
const jwt = require('jsonwebtoken');

// handle Errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '', display_name: '' };

  // incorrect email
  if(err.message === 'incorrect email') {
    errors.email = 'that email does not exist';
    return errors;
  }

  // incorrect password
  if(err.message === 'incorrect password') {
    errors.password = 'that password is not correct';
    return errors;
  }

  // duplicate error code
  if(err.code === 11000) {
    errors.email = 'that email already exist';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    });

    return errors;
  }
}

// expiry
const expiry = 3 * 24 * 60 * 60;
// token
const createToken = (id) => {
  return jwt.sign({ id }, 'weird warwick secret', {
    expiresIn: expiry
  });
}

module.exports.signup_get = async (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.signup_post = async (req, res) => {
  const { email, password, display_name } = req.body;

  try {
    const user = await User.create({ email, password, display_name });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: expiry * 1000});
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  
  try{
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: expiry * 1000});
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}