
const mongoose   = require('mongoose');
const Promise    = require('bluebird');
mongoose.Promise = Promise;
const rp         = require('request-promise');

const dbURI = process.env.MONGODB_URL || 'mongodb://localhost/wdi-project-2';

mongoose.connect(dbURI);

const User  = require('../models/user');
const Spot  = require('../models/spot');

User.collection.drop();
Spot.collection.drop();

User
.create([{
  username: 'Lee Noad',
  email: 'lee@lee.com',
  password: 'password',
  passwordConfirmation: 'password'
},{
  username: 'Nat Huitson',
  email: 'nat@nat.com',
  password: 'password',
  passwordConfirmation: 'password'

}])
.then(( users) => {
  console.log(`${users.length} users created`);
  return rp({
    method: 'GET',
    url: 'http://api.spitcast.com/api/spot/all',
    json: true
  });
})
.then((data) => {
  return Promise.map(data, (country) => {
    return Spot.create({
      name: country.spot_name,
      lat: country.latitude,
      lng: country.longitude
    });
  });
})
.then((data) => {
  console.log(`${data.length} were saved`);
})
.catch(err => {
  console.log(`Error: ${err}`);
})
.finally(() => {
  mongoose.connection.close();
});
