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
// 'next' is a new param added 04/12/20
router.put('/add-image', function (request, response) {
  let email = request.body.email;
  let image = request.body.image;
  let smallImage = request.body.smallImage;
  let imageID = request.body.imageID

  console.log('===========================================================')
  console.log(`imageID to add: ${imageID} (received by API)`);

  User.add_image(email, image, smallImage, imageID, function(error, imageID) {
    if (error || !imageID) {
      var err = new Error('Problem adding photo to database');
      err.status = 401;
      return (err)
    } else {
        response.json(imageID);
        console.log(`imageID deleted: ${imageID} (retrieved by API)`);
        console.log('===========================================================')

        // receives imageID response from user.js
        // console.log(`response from within API: ${response}`);
        return response 
    }
  })
})


//PUT request to delete image from db
router.put('/delete-image', function (request, response) {
  let email = request.body.email
  let imageID = request.body.imageID;

  console.log('===========================================================')
  console.log(`imageID to delete: ${imageID} (received by API)`)

  User.delete_image( email, imageID, function(error, photo_ID) {
    if (error || !imageID) {
      var err = new Error('Problem deleting photo from database');
      err.status = 401;
      return (err)
    } else {
        response.json(imageID);
        console.log(`imageID deleted: ${imageID} (retrieved by API)`);
        console.log('===========================================================')
        return response;
    }
  });
})


// GET request to console log list of users in mongod terminal
router.get('/users', function (request, response) {
  User.findAll();
})

module.exports = router;