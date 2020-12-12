const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const router = express.Router();
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser')


const app = express();
app.set('port', (process.env.PORT || 4000));
app.use(cors());


const uri = "mongodb+srv://admin:Levelup_2021@squixel-db.cxn9f.mongodb.net/squixel-db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });  
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

// testing 11/24/20
mongoose.connect(
    uri, { useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false
    })
    .then(() => console.log("Database Connected Successfully...(new mongoose connection)"))
    .catch(err => console.log(err));


// checks if connection with the database is successful
let db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to Mongo Database");
})

//use sessions for tracking logins
// app.use(session({
//     secret: 'work hard',
//     resave: true,
//     saveUninitialized: false,
//     store: new MongoStore({
//       mongooseConnection: db
//     })
//   }));

//use sessions for tracking logins
app.use(cookieParser('secret'));

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use('/api', require('./api'));

//init app
//build part of the react app
app.use('/', express.static(path.join(__dirname, '../build')));


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

//err
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.send(err.message);
});

//port
app.listen(app.get('port'), function () {
    console.log('App listening on port ' + app.get('port'));
});