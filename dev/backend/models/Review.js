// setup 
var mongoose = require('mongoose');

/**
 * Review schema: represents a Review in the Rating App
 */
var reviewSchema = new mongoose.Schema({
    "userID": {
        type: String,
        required:true
    },
    "storeID": {
        type: String,
        required:true
    },
    "rating": {
        type:Number,
        required:true},
    "comment": {
        type:String
    }
});

reviewSchema.index({_id : 1});
module.exports = mongoose.model('Review', reviewSchema);