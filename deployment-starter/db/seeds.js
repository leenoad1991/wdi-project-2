// const surfSpots:

const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const env        = require('../config/env');

// Require models
const Spot     = require('../models/spot');

mongoose.connect(env.db, () => {
  console.log('Connected');
});


Spot.collection.drop();

Spot
  .create([
    {
      beach: 'Venice',
      Region: 'Los Angeles',
      image: ''
    },
    {
      beach: 'Oceanside Pier',
      Region: 'San Diego',
      Image: ''
    },
    {
      beach: 'Kellys Cove',
      Region: 'San Francisco.',
      image: ''
    }
  ])
  .then(spots => {
    console.log(`${spots.length} were created`);
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  })
  .finally(() => {
    mongoose.connection.close();
  });
