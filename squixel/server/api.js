const express= require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const config = require('./config.js');
const cors = require('cors')
const mongoose = require('mongoose');
const User =  require('./models/user.js');


router.post('/login', function(request, response){
  var u = new User({
      email: request.body.email,
      password: request.body.password
  });

  u.save(function(err) {
      if (err)
         throw err;
      else 
         console.log('saved user successfully...');
  });
  response.json({msg: response.body});
});


module.exports = router;