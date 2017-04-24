const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema({
  Beach: {type: String, trim: true, required: true},
  Region: {type: String, trim: true, required: true},
  Image: {type: String, trim: true, required: true},
  wind: {type: String, trim: true, required: true},
  height: {type: String, trim: true}
});

module.exports = mongoose.model('Spot', spotSchema);











//schema is data I want to get from user and show on views page.
//Model contains all of the info (temp, swell, wind, waves etc), the module.exports at the
//bottom just act as a template for everything in the seeds.
