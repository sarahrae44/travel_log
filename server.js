const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
  secret: "China2013 Iceland2015",
  resave: false,
  saveUninitialized: false
}));

const usersController = require('./controllers/users.js');
app.use('/users', usersController);
const tripsController = require('./controllers/trips.js');
app.use('/trips', tripsController);
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.ejs', {
    currentUser: req.session.currentuser
  });
});

app.get('/app', (req, res) => {
  if(req.session.currentuser) {
    res.send('the party');
  } else {
    res.redirect('/sessions/new');
  }
});

mongoose.connect('mongodb://localhost:27017/trips');
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

app.listen(3000, ()=>{
  console.log("I am listening");
});
