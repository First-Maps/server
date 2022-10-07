import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { v4 as uuidv4 } from 'uuid'; // for id generation https://www.npmjs.com/package/uuid
import bcrypt from 'bcrypt'; // for password encryption https://www.npmjs.com/package/bcrypt
import dotenv from 'dotenv';
import joi from 'joi'; // for validation of user input https://joi.dev/api/
dotenv.config();

import * as db from './database.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieSession({ name: 'session', keys: [process.env.SESSION_KEY] }));

const api = express.Router();
app.use('/api/v1', api);

api.post('/login', async (req, res) => {
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

api.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hashSync(password, 10);

  const validateUser = joi.object({
      name: joi.string().min(3).required(),
      email: joi.string().min(5).required().email(),
      password: joi.string().min(5).required()
  }).validate(user);

  if (validateUser.error) {
    res.status(400).send(validateUser.error.details[0].message);
    return;
  }

  const user = new db.User({
    id: uuidv4(),
    name,
    email,
    password: hash,
    date: Date.now()
  });

  try {
    const result = await user.save();
    req.session.user = result;
    res.status(200).send('Signup successful');
  } catch (err) {
    // TODO: don't send the backend error to real users
    res.status(500).send(err);
  }

});

export default app;
