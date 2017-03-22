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
                    message: 'retrieved stores'
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
        var id = req.query.id;

        Stores.find({_id: id}, function(err, stores) {
            if (err) {
                res.status(404)
                .json({
                    status: 'failed',
                    data: {},
                    message: 'could not retrieve store with id:' + id
                });
            } else {
                res.status(200)
                .json({
                    status: 'success',
                    data: stores,
                    message: 'retrieved store'
                });
            }
        });
    });

    app.post('/store', function(req, res) {
        var storename = req.body.storename;
        var department = req.body.department;
        var address = req.body.address;
        
        if (!storename) {
            res.status(403)
            .json({
                status: "failed",
                data: {},
                message: "no name provided; cannot create store"
            })
        }
        var newStore = new Stores({
            storename: storename,
            department: department,
            address: address,
        });

        newStore.save();
        res.status(200)
        .json({
            status: 'success',
            data: newStore,
            message: 'Store created'
        });
    });

    // update the store's information
    app.put('/store', function(req, res) {
        var id = req.query.id;
        var storename = req.body.storename;
        var department = req.body.department;
        var address = req.body.address;
        
        Stores.findOneAndUpdate({_id: id}, {storename: storename, department: department, address: address}, {new: true}, function(err, store) {
            if (err) {
                res.status(404)
                .json({
                    status: 'failed',
                    data: {},
                    message: err
                });
            } else {
                res.status(200)
                .json({
                    status: 'success',
                    data: store,
                    message: 'updated' 
                });
            }
        }); 
    });

    // delete a store
    app.delete('/store', function(req, res) {
        var id = req.query.id;
        Stores.findOneAndRemove({_id: id}, function(err) {
            if (err) {
                res.status(404)
                .json({
                    status: 'failed',
                    data: {},
                    message: id
                });
            } else {
                // TODO delete reviews
                res.status(200)
                .json({
                    status: 'success',
                    data: {},
                    message: 'deleted the store' 
                });
            }
        }); 
    });
};