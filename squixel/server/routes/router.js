const express= require('express');
const router = express.Router();
//changed ./models/user.js  to  ../models/user.js
const User =  require('../models/user.js');


router.post('/register', function(request, response){
      var u = new User({
        email: request.body.email,
        password: request.body.password,
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
        return next(err)
      } else {
        // request.session.userID = user_id;
        console.log('user authenticated! :D');
        return response.redirect('/profile');
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


// works mofo 
router.put('/add-image', function (request, response) {
  let email = request.body.email;
  let image = request.body.image;

  User.add_image(email, image)
  return response
})
// =================================== curent ====================================

// no workie
router.get('/getUserContent', function (request, response, email) {  
  User.getUserContent(email)
})

// =================================== end curent====================================


// works mofo, posts console log in mongod terminal
router.get('/users', function (request, response) {
  User.findAll();
})

module.exports = router;