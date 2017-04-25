const Spot = require('../models/spot');

function spotsMap(req, res) {
  res.render('spots/index');
}

function spotsIndex(req, res, next) {
  Spot
  .find()
  .then((spots) => res.status(200).json(spots))
  .catch(next);
}

function spotsShow(req, res, next) {
  Spot
  .findById(req.params.id)
  .then((spot) => {
    if (!spot) return res.status(404).render('statics/404');
    res.render('spots/show', { spot});
  })
  .catch(next);
}

function spotsNew(req, res) {
  return res.render('spots/new');
}

function spotsCreate(req, res, next) {
  Spot
  .create(req.body)
  .then(() => res.redirect('/spots'))
  .catch(next);
}

function spotsEdit(req, res, next) {
  Spot
  .findById(req.params.id)
  .then((spot) => {
    if (!spot) return res.status(404).render('statics/404');
    res.render('spots/edit', { spot });
  })
  .catch(next);
}

function spotsUpdate(req, res, next) {
  Spot
  .findById(req.params.id)
  .then((spot) => {
    if (!spot) return res.status(404).render('statics/404');

    for (const field in req.body) {
      spot[field] = req.body[field];
    }

    return spot.save();
  })
  .then(( spot) => res.redirect(`/spots/${ spot.id}`))
  .catch(next);
}

function spotsDelete(req, res, next) {
  Spot
  .findById(req.params.id)
  .then((spot) => {
    if(!spot) return res.status(404).render('statics/404');
    return spot.remove();
  })
  .then(() => res.redirect('/spots'))
  .catch(next);
}


module.exports = {
  index: spotsIndex,
  new: spotsNew,
  show: spotsShow,
  create: spotsCreate,
  edit: spotsEdit,
  update: spotsUpdate,
  delete: spotsDelete,
  map: spotsMap
};
