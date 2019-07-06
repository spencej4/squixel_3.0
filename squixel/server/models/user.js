var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }, 
  // content: {
  //   type: Array,  
  // }
  content: [{
    image: String,
    smallImage: String
  }]
});


//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          // console.log(`Hello there User   (from: schema)`);
          // console.log(`User ID: ${user._id}   (from: schema)`);
          return callback(null, user);
        } else {
          return callback("this user could not be authenticated");
          // return callback(user._id);
        }
      })
    });
}


UserSchema.statics.getUserContent = function (email, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
          return callback(err)
      } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
      } else {
          // console.log('line 56 reached in schema');
          return callback( null, user )
      }
  })
}


// add an image to database
UserSchema.statics.add_image = function (email, image, smallImage, callback) {
  User.findOneAndUpdate(
    { "email": email },
    {"$push": { "content": { image, smallImage }}},
    { upsert: true, new: true  }, 
    function(res, doc) {
        let photo_ID = doc.content[doc.content.length-1]._id;
        // console.log(`PHOTO ID: ${photo_ID}`);
        return callback( null, photo_ID);
    }
  );
}

// delete image from database
UserSchema.statics.delete_image = function (email, photo_ID, callback) {
  // console.log(`PHOTO ID from within mongoose model : ${photo_ID}`);
  // console.log(`EMAIL FROM from within mongoose model: ${email}`);
  User.findOneAndUpdate(
    {'email': email} ,
    { "$pull": { "content": { _id: photo_ID }}},
    {'new': true},
    function(err, res, doc) {
      console.log(`Error: ${err}`)
      // console.log('doc', JSON.stringify(doc));
      return callback( null, 'image deleted');
    }
  )
}


// get list of all users in database
UserSchema.statics.findAll = function (request, response) {
  User.find({}, function(err, users) {
    var userMap = {};
  
    users.forEach(function(user) {
      userMap[user._id] = user;
    });
    
    console.log(userMap)
    // response.send(userMap);  
  });
}


//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


var User = mongoose.model('User', UserSchema);

module.exports = User;