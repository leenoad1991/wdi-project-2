const router        = require('express').Router();
const spots         = require('../controllers/spots');
const registrations = require('../controllers/registrations');
const sessions      = require('../controllers/sessions');


function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in.');
      res.redirect('/login');
    });
  }

  return next();
}

router.route('/spots')
  .get(spots.index)
  .post(secureRoute, spots.create);

router.route('/spots/new')
  .get(secureRoute, spots.new);

router.route('/spots/:id')
  .get(spots.show)
  .put(secureRoute, spots.update);
  .delete(secureRoute, spots.delete);


router.route('/spots/:id/edit')
    .get(spots.edit);

router.route('/spots/:id')
  .delete(spots.delete);

router.route('/register')
    .get(registrations.new)
    .post(registrations.create);
//
//
router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

module.exports = router;

//
// /register
// /login
// /surfspots

//root is the bit after the /(ie amazon/MAKEUP)
//this is where our verbs go.
//request and response.
