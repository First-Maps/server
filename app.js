import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import uuid from 'uuid'; // for id generation
import bcrypt from 'bcrypt'; // for password encryption
import dotenv from 'dotenv';
dotenv.config();

import * as db from './database.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieSession({ name: 'session', keys: [process.env.SESSION_KEY] }));

const api = express.Router();
app.use('/api/v1', api);

api.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.User.findOne({ email }, (err, user) => {
    if (err) {
      // TODO: don't send the backend error to real users
      res.status(500).send(err);
    } else if (!user) {
      res.status(404).send('User not found');
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          // TODO: don't send the backend error to real users
          res.status(500).send(err);
        } else if (result) {
          req.session.user = user;
          res.status(200).send('Login successful');
        } else {
          res.status(401).send('Incorrect password');
        }
      });
    }
  });
});

api.post('/logout', (req, res) => {
  req.session = null;
  res.status(200).send('Logout successful');
});

module.exports = app;
