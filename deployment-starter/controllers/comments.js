const Spot = require('../models/spot');

function commentsCreate(req, res, next) {
  Spot
    .findById(req.params.id)
    .exec()
    .then(spot => {
      if (!spot) {
        const err = new Error('spot not found');
        err.status = 404;
        throw err;
      }

      const comment = {
        user: res.locals.user._id,
        body: req.body.body
      };

      spot.comments.push(comment);

      return spot.save();
    })
    .then((spot) => {
      console.log(spot);
      res.redirect(`/spots/${req.params.id}`);
    })
    .catch(next);
}

module.exports = {
  create: commentsCreate
};
