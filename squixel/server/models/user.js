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
  content: {
    type: Array
}
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
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

// ============================================== new ==============================================
// works mofo
UserSchema.statics.add_image = function (email, image) {
  User.update({ email: email }, { $push: { content: image }})
    .exec(function(err, user){
    console.log(`${image} has been added to your collection!`);
  })
}


// =========================================== current ===========================================
UserSchema.statics.getUserContent = function (email) {
  User.find({ email: email })
    .exec(function (err, user) {
      if (err) {
          return callback(err)
      } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
      } else {
          return user
      }
  })
}
// ========================================== end current =======================================

// ============================================== end new ==============================================



// --------------------------------------------- mine ---------------------------------------------
//get list of all users in database
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
// --------------------------------------------- end mine ---------------------------------------------


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