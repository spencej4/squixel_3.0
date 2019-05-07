var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// this will be our data base's UserDB data structure 
const UserDB = new Schema(
    {
    user: {
        userID: String,
        required: true
    },
    content: [],
})


module.exports = mongoose.model("users_database", UserDB);
