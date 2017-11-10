const express = require('express');
const app = express();
const trips = require('./models/trips.js');

app.get('/trips', (req, res) => {
  res.send('here is a trip');
});

app.get('/trips/:index', function(req, res) {
  res.render('show.ejs', {
    trip: trips[req.params.index]
  });
});


app.listen(3000, ()=>{
  console.log("I am listening");
});
