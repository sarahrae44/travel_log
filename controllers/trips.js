const express = require('express');
const router = express.Router();
const Trip = require('../models/trips.js');

router.get('/new', (req, res) => {
  res.render('new.ejs');
});

router.post('/', (req, res) => {
  Trip.create(req.body, () => {
    res.redirect('/trips');
  });
});

router.get('/', (req, res) => {
  Trip.find({}, (error, allTrips) => {
    res.render('index.ejs', {
      trips: allTrips
    });
  });
});

router.get('/:id', (req, res) => {
  Trip.findById(req.params.id, (err, foundTrip) => {
    res.render('show.ejs', {
      trip:foundTrip
    });
  });
});

router.delete('/:id', (req, res) => {
  Trip.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/trips')
  });
});

router.get('/:id/edit', (req, res) => {
  Trip.findById(req.params.id, (err, foundTrip) => {
    res.render('edit.ejs', {
      trip: foundTrip
    });
  });
});

router.put('/:id', (req, res) => {
  Trip.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedTrip) => {
    res.redirect('/trips');
  });
});

module.exports = router;
