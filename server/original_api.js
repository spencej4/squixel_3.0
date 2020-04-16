const express= require('express');
const router = express.Router();
const User =  require('./models/user.js');

//POST request for user registration
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
          // request.session.userId = user._id;
          console.log('saved user successfully...');
    });
    response.json({msg: response.body});
});


// POST request for user login
router.post('/login', function(request, response, next){
  // console.log(`Email: ${request.body.email}   (from: api)`);
  // console.log(`Password: ${request.body.password}   (from: api)`);

   User.authenticate(request.body.email, request.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err)
      } else {
        console.log(`User ID: ${user._id} is authenticated  (from: api)`);
        let body = user.id;
        return response.json(body);
      }
    });
});


// GETS request for user content
router.get('/getUserContent/:user', function (request, response, next) {  
  var user = request.params.user;
  // console.log(`User request param from API: ${ user }`);

  User.getUserContent(user, function (error, user, result) {
    if (error || !user) {
      var err = new Error('Wrong email or password.');
      err.status = 401;
      return next(err)
    } else if (!user) {
      var err = new Error('Collection not found.');
      err.status = 401;
      return callback(err);
    }else {
      response.json(user.content);
      return response 
    }
  })
})


// PUT request for adding image to db
router.put('/add-image', function (request, response) {
  let email = request.body.email;
  let user_ID = request.body.user_ID;
  let image = request.body.image;
  let smallImage = request.body.smallImage;

  User.add_image(email, image, smallImage, function(error, photo) {
    if (error || !photo) {
      var err = new Error('Problem adding photo to database');
      err.status = 401;
      return next(err)
    } else {
        response.json(photo);
        // console.log(`PHOTO ID FROM WITHIN API: ${photo}`);
        return response 
    }
  });
})


//PUT request to delete image from db
router.put('/delete-image', function (request, response) {
  let email = request.body.email;
  let photo_ID = request.body.photo_ID;

  // console.log(`PHOTO ID FROM WITHIN API ON THE WAY TO MODEL: ${photo_ID}`);

  User.delete_image( email, photo_ID, function(error, photo) {
    if (error || !photo) {
      var err = new Error('Problem deleting photo from database');
      err.status = 401;
      return (err)
    } else {
        response.json(photo);
        return response;
    }
  });
})


// GET request to console log list of users in mongod terminal
router.get('/users', function (request, response) {
  User.findAll();
})

module.exports = router;