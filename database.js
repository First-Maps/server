import mongoose from 'mongoose'; // https://mongoosejs.com/docs/guide.html

const db = mongoose.connect(
  'mongodb://localhost:27017/MyDatabase', 
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

// below is just an example of how we can use mongoose

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  password: String,
  date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = { User, validateUser };
