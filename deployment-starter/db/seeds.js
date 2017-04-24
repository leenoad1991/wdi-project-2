
const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const dbURI = process.env.MONGODB_URL || 'mongodb://localhost/wdi-project-2';

mongoose.connect(dbURI);

const User  = require('../models/user');
const Spot  = require('../models/spots');

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
});

Spot
.create([{
  beach: 'Venice',
  Region: 'Los Angeles',
  image: 'http://1d1abi33xa0d480qio3hozwhher.wpengine.netdna-cdn.com/wp-content/uploads/2013/04/Vence-Boardwalk-VeniceBeach.com_.jpg'
},
{
  beach: 'Oceanside Pier',
  Region: 'San Diego',
  Image: 'http://1d1abi33xa0d480qio3hozwhher.wpengine.netdna-cdn.com/wp-content/uploads/2013/04/Vence-Boardwalk-VeniceBeach.com_.jpg'
},
{
  beach: 'Kellys Cove',
  Region: 'San Francisco.',
  image: 'http://1d1abi33xa0d480qio3hozwhher.wpengine.netdna-cdn.com/wp-content/uploads/2013/04/Vence-Boardwalk-VeniceBeach.com_.jpg'
}
])
.then((spots) => {
  console.log(`${spots.length} were created`);
})
.catch(err => {
  console.log(`Error: ${err}`);
})
.finally(() => {
  mongoose.connection.close();
});
