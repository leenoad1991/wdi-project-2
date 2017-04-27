const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema({
  name: {type: String, trim: true, required: true},
  countyName: {type: String, trim: true, required: true},
  lat: {type: Number, trim: true},
  lng: {type: Number, trim: true},
  spotId: {type: Number, trim: true}
});

module.exports = mongoose.model('Spot', spotSchema);
