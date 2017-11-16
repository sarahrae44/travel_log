const mongoose = require('mongoose');
const Trip = require('./trips.js');

const userSchema = mongoose.Schema({
  name: String,
  password: String,
  trips: [Trip.schema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
