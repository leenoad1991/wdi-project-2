const express = require('express');
const router  = express.Router();
const spots   = require('../controllers/spots');

router.get('/', (req, res) => res.render('statics/home'));

router.route('/spots')
  .get(spots.index)
  .post(spots.create);
router.route('/spots/new')
  .get(spots.new);
router.route('/spots/:id')
  .get(spots.show)
  .put(spots.update);
router.route('/spots/:id/edit')
    .get(spots.edit);
router.route('/spots/:id')
  .delete(spots.delete);
  router.route('/register')
    .get(registrations.new)
    .post(registrations.create);
module.exports = router;

//
// /register
// /login
// /surfspots

//root is the bit after the /(ie amazon/MAKEUP)
//this is where our verbs go.
//request and response.




// psudo
// Set-up
// authentication
// Home page styling
//load google maps when page loads
//seed Magic Seaweed data to load on google maps
