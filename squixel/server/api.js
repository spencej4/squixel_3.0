const express= require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const config = require('./config.js');
const cors = require('cors')
const mongoose = require('mongoose');
const User =  require('./models/user.js');
var bcrypt = require('bcrypt');


router.post('/register', function(request, response){
      var u = new User({
        email: request.body.email,
        password: request.body.password,
        content: request.body.content
    });

    u.save(function(err) {
        if (err)
          throw err;
        else 
          console.log('saved user successfully...');
    });
    response.json({msg: response.body});
});

router.post('/login', function(request, response){
  console.log(`Email: ${request.body.email}`);
  console.log(`Password: ${request.body.password}`);

   User.authenticate(request.body.email, request.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return
      } else {
        // request.session.userId = user._id;
        console.log('user authenticated! :D');
        let userID = response.user
        console.log(userID);
        // get user id somehow here...
        return response.send(user._id)
      }
    });
});

// GET route after registering
router.get('/profile', function (request, response, next) {
  User.findById(request.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return response.send('<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});

router.put('/add-image:email:image', function (request, response) {
  let email = request.email;
  let image = request.image;

  User.add_image(email, image)
})




module.exports = router;