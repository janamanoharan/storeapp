// setup 
var mongoose = require('mongoose');

/**
 * Store schema: represents a Store in the Rating App
 */
var storeSchema = new mongoose.Schema({
        "storename": {
            type: String,
            required:true
        },
        "category": {
             type: String,
             default:""
        },
        "address": {
             type: String,
             default:""
        }
});

storeSchema.index({_id : 1});
module.exports = mongoose.model('Store', storeSchema);