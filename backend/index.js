const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;
const routes = require('./routes');
const config = require('./config');

let port = process.env.PORT || 8082;

app.use(passport.initialize());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app);

mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useNewUrlParser: true });

app.listen(port, ()=>{
	console.log('listening on port: '+port);
})