// setup 
var mongoose = require('mongoose');

/**
 * User schema: represents a User in the Rating App
 */
var userSchema = new mongoose.Schema({
   "username": { 
        type: String,
        required: true,
        unique:true
    },
   "firstname": {
        type: String,
        default: ""
    },
   "lastname": {
        type: String,
        default:""
    },
   "sex": {
        type: String,
        default:""
    },
   "age": {
        type: Number,
        default: 0
    }
});

userSchema.index({_id : 1});
module.exports = mongoose.model('User', userSchema);