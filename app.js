const express = require('express');
const mongoose = require('mongoose');

const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://weird:test123@learningnode.meubb.mongodb.net/node-auth';
mongoose.connect(dbURI)
  .then((result) => app.listen(4002))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));