import mongoose from 'mongoose';
import joi from 'joi'; // for validation of user input

const db = mongoose.connect(
  'mongodb://localhost:27017/MyDatabase', 
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

// below is just an example of how we can use mongoose to create a model and joi to validate it

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  password: String,
  date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(5).required()
  });
  return schema.validate(user);
}

module.exports = { User, validateUser };
