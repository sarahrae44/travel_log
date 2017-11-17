const express = require('express');
const router = express.Router();
const Trip = require('../models/trips.js');
const User = require('../models/users.js');

router.get('/', (req, res) => {
  Trip.find({}, (err, foundTrips) => {
    res.render('trips/index.ejs', {
      trips: foundTrips
    });
  })
});

router.get('/new', (req, res) => {
  User.find({}, (err, allUsers) => {
    res.render('trips/new.ejs', {
      users: allUsers
    });
  });
});

router.post('/', (req, res) => {
  User.findById(req.body.userId, (err, foundUser) => {
    Trip.create(req.body, (err, createdTrip) => {
      foundUser.trips.push(createdTrip);
      foundUser.save((err, data) => {
        res.redirect('/trips');
      });
    });
  });
});

router.get('/:id', (req, res) => {
  Trip.findById(req.params.id, (err, foundTrip) => {
    User.findOne({'trips._id':req.params.id}, (err, foundUser) => {
      res.render('trips/show.ejs', {
        user: foundUser,
        trip: foundTrip
      });
    })
  });
});

router.delete('/:id', (req, res) => {
  Trip.findByIdAndRemove(req.params.id, (err, foundTrip) => {
    User.findOne({'trips._id':req.params.id}, (err, foundUser) => {
      foundUser.trips.id(req.params.id).remove();
      foundUser.save((err, data) => {
        res.redirect('/trips');
      });
    });
  });
});

router.get('/:id/edit', (req, res) => {
  Trip.findById(req.params.id, (err, foundTrip) => {
    User.find({}, (err, allUsers) => {
      User.findOne({'trips._id':req.params.id}, (err, foundUserTrip) => {
        res.render('trips/edit.ejs', {
          trip: foundTrip,
          users: allUsers,
          tripUser: foundTripUser
        });
      });
    });
  });
});

router.put('/:id', (req, res) => {
  Trip.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedTrip) => {
    User.findOne({ 'trips._id': req.params.id }, (err, foundUser) => {
      if(foundUser._id.toString() !== req.body.userId){
        foundUser.trips.id(req.params.id).remove();
        foundUser.save((err, savedFoundUser) => {
          User.findById(req.body.userId, (err, newUser) => {
            newUser.trips.push(updatedTrip);
            newUser.save((err, savedNewUser) => {
              res.redirect('/trips/'+req.params.id);
            });
          });
        });
      } else {
        foundUser.trips.id(req.params.id).remove();
        foundUser.trips.push(updatedTrip);
        foundUser.save((err, data) => {
          res.redirect('/trips/'+req.params.id);
        });
      }
    });
  });
});

module.exports = router;
