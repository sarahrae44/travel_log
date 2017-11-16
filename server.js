const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));

const usersController = require('./controllers/users.js');
app.use('/users', usersController);

const tripsController = require('./controllers/trips.js');
app.use('/trips', tripsController);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.ejs')
});

mongoose.connect('mongodb://localhost:27017/trips');
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

app.listen(3000, ()=>{
  console.log("I am listening");
});
