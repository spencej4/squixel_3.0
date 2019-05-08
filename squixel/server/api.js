const express= require('express');
const router = express.Router();
const User =  require('./models/user.js');


router.post('/register', function(request, response){
      var u = new User({
        email: request.body.email,
        password: request.body.password,
    });

    u.save(function(err, user) {
        if (err)
          throw err;
        else 
          // added this here
          request.session.userId = user._id;
          console.log('saved user successfully...');
    });
    response.json({msg: response.body});
});


router.post('/login', function(request, response, next){
  // console.log(`Email: ${request.body.email}   (from: api)`);
  // console.log(`Password: ${request.body.password}   (from: api)`);

   User.authenticate(request.body.email, request.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err)
      } else {
        console.log('user authenticated! :D     (from: api)');
        // console.log(`User ID: ${user._id}   (from: api)`)
        request.session.userID = user._id;
        return response.send('<h1>User Email: </h1>' + user.email + '<h2>User ID: </h2>' + user._id + '<br><a type="button" href="/logout">Logout</a>')
      }
    });
});

// =================================== curent ====================================

// no workie
router.get('/getUserContent/:email/:/password', function (request, response, next) {  
  User.getUserContent(request.email, request.body.password, function (error, user) {
    if (error || !user) {
      var err = new Error('Wrong email or password.');
      err.status = 401;
      return next(err)
    } else {
      console.log(response);
      return response.data
    }
  })
})

// =================================== end curent====================================


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


router.put('/add-image', function (request, response) {
  let email = request.body.email;
  let image = request.body.image;

  User.add_image(email, image)
  return response
})


// works mofo, posts console log in mongod terminal
router.get('/users', function (request, response) {
  User.findAll();
})

module.exports = router;