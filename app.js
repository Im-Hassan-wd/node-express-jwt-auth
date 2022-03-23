const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const Uri = require('./dbURI/Uri');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = Uri;
mongoose.connect(dbURI)
  .then((result) => app.listen(4000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);
// 404
app.use((req, res) => {
  res.status(404).render('404');
});