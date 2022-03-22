const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = res.cookie.jwt;

  // check json web token exits & is verified
  if (token) {
    jwt.verify(token, 'weird warwick secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken)
        next();
      }
    });
  }
  else {
   res.redirect('/login');
  }
}