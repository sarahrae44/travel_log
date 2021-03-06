const express = require('express');
const User = require('../models/users.js');
const Trip = require('../models/trips.js');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  User.find({}, (err, foundUsers) => {
    res.render('users/index.ejs', {
      users: foundUsers
    });
  })
});

router.post('/', (req, res) => {
  // req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, createdUser) => {
    res.redirect('/users');
  });
});

router.get('/new', (req, res) => {
  res.render('users/new.ejs');
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    res.render('users/show.ejs', {
      user: foundUser
    });
  });
});

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, foundUser) => {
    const tripIds = [];
    for(let i = 0; i < foundUser.trips.length; i++) {
      tripIds.push(foundUser.trips[i]._id);
    }
    Trip.remove(
      {
        _id: {
          $in: tripIds
        }
      },
      (err, data) => {
        res.redirect('/users');
      }
    );
  });
});

router.get('/:id/edit', (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    res.render('users/edit.ejs', {
      user: foundUser
    });
  });
});

router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, () => {
    res.redirect('/users');
  });
});

module.exports = router;
