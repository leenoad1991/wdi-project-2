const mongoose = require('mongoose');

const spotSchema = new mongooseSchema ({
  Beach: {type: string, trim: true, required: true},
  Region: {type: string, trim: true, required: true},
  Image: {type: string, trim: true, required: true},
  wind: {type: string, trim: true, required: true},
  wave height: {type: string, trim: true}
});

module.exports = mongoose.model('venue', venueSchema)











//schema is data I want to get from user and show on views page.
//Model contains all of the info (temp, swell, wind, waves etc), the module.exports at the
//bottom just act as a template for everything in the seeds.
