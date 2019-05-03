const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);



const app =express();
app.set('port', (process.env.PORT || 4000));

// -----------------------------------------new-----------------------------------------
app.use(cors());
const router = express.Router();


// here
//this is our MongoDB database
const dbRoute = "mongodb://admin:Level_2020@ds259732.mlab.com:59732/heroku_9d3jq7bc";

//connects our back end code with the database
mongoose.connect(
    dbRoute, {
        useNewUrlParser: true
    }
);

// checks if connection with the database is successful
let db = mongoose.connection;
db.once('open', function () {
    console.log("Connected to Mongo Database");
})

mongoose.Promise = global.Promise;
// to here


//connect to MongoDB
// mongoose.connect('mongodb://localhost/testForAuth');
// var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   // we're connected!
// });

// //use sessions for tracking logins
// app.use(session({
//   secret: 'work hard',
//   resave: true,
//   saveUninitialized: false,
//   store: new MongoStore({
//     mongooseConnection: db
//   })
// }));


// uncomment this afterwards...
// serve static files from template
// app.use(express.static(__dirname + '/templateLogReg'));

// include routes
// var routes = require('./routes/router');
// app.use('/', routes);

// ----------------------------------------end new----------------------------------------


app.use(bodyParser.json());
// app.use('/api', require('./api'));

//init app
//build part of the react app
//uncoment this after npm build
app.use('/', express.static(path.join(__dirname, '../build')));


//testing, uncomment this to go back to normal
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

//err
app.use(function(err, req, res, next){
  //console.log(err);
  res.status(422).send({error: err.message})
});

// ---------------------------------------------mine---------------------------------------------
app.get('/testForAuth', function (req, res) {
  res.sendFile(path.join(__dirname, '/templateLogReg'));
})
// ---------------------------------------------ene mine--------------------------------------------- 


//port
app.listen(app.get('port'), function () {
    console.log('App listening on port ' + app.get('port'));
});
