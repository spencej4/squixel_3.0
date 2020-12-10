const express = require('express');
// new 12/08/20
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


// this is our MongoDB database
// original:
// const dbRoute = "mongodb://admin:Level_2020@ds259732.mlab.com:59732/heroku_9d3jq7bc";


// testing new driver and new cluster db via GoogleCloud
// 12/08/20
// const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:Levelup_2021@squixel-db.cxn9f.mongodb.net/squixel-db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });  
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

// original 11/24/20
//connects our back end code with the database
// mongoose.connect(
//     dbRoute, {
//         useNewUrlParser: true,
//         useMongoClient: true 
//     },
// );

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

// connecting to our mongodb atlas db via shell
// mongo "mongodb+srv://squixel-db.cxn9f.mongodb.net/squixel-db" --username admin

// sample of one user document within user collection in amber's old db

// {
//     "_id": {
//         "$oid": "5eb42e7522f2a71cbdf89e95"
//     },
//     "email": "test@test.com",
//     "password": "$2b$10$5NmMyalEiGYEvzJG691.2eQK89nJo.ZetVq68cyH84N16mmznPYuG",
//     "content": [],
//     "__v": 0
// }

// testing inserstion of new users via shell
// db.users.insertOne(
//     { "user" : "test@test.com",
//       "content": []
//     }
//  )