const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const trips = require('./models/trips.js');
const methodOverride = require('method-override');

app.use((req, res, next) => {
  console.log('I run for all routes');
  next();
})

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));

app.get('/trips', (req, res) => {
  res.render('index.ejs', {
    trips: trips
  });
});

app.get('/trips/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/trips', (req, res) => {
  trips.push(req.body);
  res.redirect('/trips');
});

app.get('/trips/:index', (req, res) => {
  res.render('show.ejs', {
    trip: trips[req.params.index]
  });
});

app.get('/trips/:index/edit', (req, res) => {
  res.render(
    'edit.ejs',
    {
      trip: trips[req.params.index],
      index: req.params.index
    }
  );
});

app.put('/trips/:index', (req, res) => {
  trips[req.params.index] = req.body;
  res.redirect('/trips');
})

app.delete('/trips/:index', (req, res) => {
  trips.splice(req.params.indes, 1);
  res.redirect('/trips');
});

app.listen(3000, ()=>{
  console.log("I am listening");
});
