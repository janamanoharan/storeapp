var Stores = require('../models/Store');

module.exports = function(app) {

    // get all the stores in the database
    app.get('/stores', function(req, res) {
        var storename = req.query.storename;
        var category = req.query.category;

        var callback = function(err, stores) {
            if (err) {
                res.status(400)
                .json({
                    status: 'failed',
                    data: {},
                    message: 'could not retrieve stores'
                });
            } else {
                res.status(200)
                .json({
                    status: 'success',
                    data: stores,
                    message: 'retrieved users'
                });
            }
        };

        if (storename && category) {
            Stores.find({storename: storename, category: category}, callback);
        } else if (storename) {
            Stores.find({storename: storename}, callback);            
        } else if (category) {
            Stores.find({category: category}, callback);                        
        } else {
            Stores.find({}).sort({storename: 1}).exec(callback);
        }
    });

    // get a store by id
    app.get('/store', function(req, res) {
        
    });
};