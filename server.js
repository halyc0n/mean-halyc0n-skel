'use strict';

var express     = require('express'),
    app         = express(),
    port        = process.env.PORT || '8888',
    mongoose    = require('mongoose'),
    passport    = require('passport'),

    bodyParser    = require('body-parser'),
    session       = require('express-session'),
    flash         = require('connect-flash'),
    morgan        = require('morgan'),

    path = './config/' + app.settings.env + '/database.js',
    configDb = require(path);

mongoose.connect(configDb.url);

require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.set('view engine', 'ejs');

app.use(session({
  secret: 'our_secret_key',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(__dirname + '/public'));

require('./app/controllers/app_controller')(app, passport);
require('./app/controllers/users_controller')(app, express.Router());

module.exports = {
  app: app,
  port: port
}
