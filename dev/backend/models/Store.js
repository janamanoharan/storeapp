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
        "department": {
             type: String,
             default:""
        },
        "address": {
             type: String,
             default:""
        }
});

module.exports = mongoose.model('Store', storeSchema);