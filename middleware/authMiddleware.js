const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = res.cookie.jwt;

  // check json web token exits & is verified
  if (token) {
    jwt.verify(token, 'weird warwick secret')
  }
  else {
   res.redirect('/login');
  }
}