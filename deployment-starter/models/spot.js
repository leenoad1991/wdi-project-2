const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema({
  name: {type: String, trim: true, required: true},
  lat: {type: Number, trim: true},
  lng: {type: Number, trim: true}
});

module.exports = mongoose.model('Spot', spotSchema);











//schema is data I want to get from user and show on views page.
//Model contains all of the info (temp, swell, wind, waves etc), the module.exports at the
//bottom just act as a template for everything in the seeds.
