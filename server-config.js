var express = require('express');
var partials = require('express-partials');
var util = require('./lib/utility');

var mongoose    = require('mongoose');
mongoose.connect('mongodb://shortly:shortly@ds031873.mongolab.com:31873/shortly'); // connect to mongo database named shortly
var userController = require('./app/mongo/userController.js');
var linksController = require('./app/mongo/linkController.js');

var handler = require('./lib/request-handler');

var app = express();

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(partials());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser('shhhh, very secret'));
  app.use(express.session());
});

/*
app.get('/', util.checkUser, handler.renderIndex);
app.get('/create', util.checkUser, handler.renderIndex);

app.get('/links', util.checkUser, handler.fetchLinks);
app.post('/links', handler.saveLink);

app.get('/login', handler.loginUserForm);
app.post('/login', handler.loginUser);
app.get('/logout', handler.logoutUser);

app.get('/signup', handler.signupUserForm);
app.post('/signup', handler.signupUser);

app.get('/*', handler.navToLink);
*/

app.get('/', handler.renderIndex);

app.get('/links', linksController.allLinks);
app.post('/links', linksController.newLink);

app.get('/signup', handler.signupUserForm);
app.post('/signup', userController.signup);

app.get('/login', handler.loginUserForm);
app.post('/login', userController.signup);
app.get('/logout', handler.logoutUser);

app.get('/*', linksController.navToLink);

module.exports = app;
