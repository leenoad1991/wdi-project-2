const Spot = require('../models/spot');

function spotsIndex(req, res) {
  Spot
  .find()
  .exec()
  .then(spots => {
    return res.render('spots', { spots });
  })
  .catch(err => {
    return res.render('error', { error: err });
  });
}

module.exports = {
  index: spotsIndex
};

function spotsShow(req, res) {
  Spot
  .findById(req.params.id)
  .exec()
  .then(spot => {
    if (!spot) {
      return res.render('error', { error: 'No spot found.' });
    }
    return res.render('spots/show', { spot });
  })
  .catch(err => {
    return res.render('error', { error: err });
  });
}


module.exports = {
  index: spotsIndex,
  show: spotsShow
};

function spotsNew(req, res) {
  return res.render('spots/new');
}

function spotsCreate(req, res) {
  Spot
  .create(req.body)
  .then(spot => {
    if (!spot) return res.render('error', { error: 'No spot was created!' });
    return res.redirect('/spots');
  })
  .catch(err => {
    return res.render('error', { error: err });
  });
}

module.exports = {
  index: spotsIndex,
  show: spotsShow,
  new: spotsNew,
  create: spotsCreate
};

function spotsEdit(req, res) {
  Spot
  .findById(req.params.id)
  .exec()
  .then(spot => {
    if (!spot) {
      return res.render('error', { error: 'No spot found.' });
    }
    return res.render('spots/edit', { spot });
  })
  .catch(err => {
    return res.render('error', { error: err });
  });
}

module.exports = {
  index: spotsIndex,
  show: spotsShow,
  new: spotsNew,
  create: spotsCreate,
  edit: spotsEdit
};

function spotsUpdate(req, res) {
  Spot
  .findById(req.params.id)
  .exec()
  .then(spot => {
    if (!spot) {
      return res.render('error', { error: 'No spot found.' });
    }
    for (const field in req.body) {
      spot[field] = req.body[field];
    }
    return spot.save();
  })
  .then(spot => {
    if (!spot) {
      return res.render('error', { error: 'Something went wrong during the update.' });
    }
    return res.render('spots/show', { spot });
  })
  .catch(err => {
    return res.render('error', { error: err });
  });
}


module.exports = {
  index: spotsIndex,
  show: spotsShow,
  new: spotsNew,
  create: spotsCreate,
  edit: spotsEdit,
  update: spotsUpdate
};

function spotsDelete(req, res) {
  Spot
  .findByIdAndRemove(req.params.id)
  .exec()
  .then(() => {
    return res.redirect('/spots');
  })
  .catch(err => {
    return res.render('error', { error: err });
  });
}

module.exports = {
  index: spotsIndex,
  show: spotsShow,
  new: spotsNew,
  create: spotsCreate,
  edit: spotsEdit,
  update: spotsUpdate,
  delete: spotsDelete
};

function sessionsCreate(req, res) {
  User
  .findOne({ email: req.body.email })
  .then((user) => {
    if(!user || !user.validatePassword(req.body.password)) {
      return res.status(401).render('sessions/new', { message: 'Unrecognised credentials' });
    }

    req.session.userId = user.id;

    return res.redirect('/');
  });
}
