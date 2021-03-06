const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

const app = express();

const optionsDB = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  retryWrites: true,
  user: process.env.MONGO_ATLAS_USR,
  pass: process.env.MONGO_ATLAS_PSW,
  // authSource: 'admin',
};
const urlDB = process.env.MONGO_ATLAS_URL;
mongoose
  .connect(urlDB, optionsDB)
  .then(() => {
    console.info('Connected to database!');
  })
  .catch((error) => {
    console.error('Connection failed!');
    console.error(error);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/images', express.static(path.join('images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
