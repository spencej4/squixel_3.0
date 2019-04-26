const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');



const app =express();
app.set('port', (process.env.PORT || 4000));

//update this by making a squixel mongoDB and then providing link here
var promise = mongoose.connect('mongodb://topLevel:Progress19@ds143326.mlab.com:43326/heroku_trcqnm8p', {
  useMongoClient: true,
});

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use('/api', require('./api'));

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

//port
app.listen(app.get('port'), function () {
    console.log('App listening on port ' + app.get('port'));
});
