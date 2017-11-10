const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  date: { type: String, require: true },
  notes: { type: String },
  photos: { type: Array }
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
