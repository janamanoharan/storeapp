var Reviews = require('../models/Review');
var Users = require('../models/User');
var Stores = require('../models/Store');

module.exports = function(app) {

    // make a new review given that it is valid
    app.post('/review', function(req, res) {
        var storeId = req.body.storeID;
        var userId = req.body.userID;
        var rating = req.body.rating;
        var comment = req.body.comment;

        var validIds = (storeId && userId);
        var validRating = ((rating >= 0) && (rating <= 10));
        
        if (! (validIds && validRating)) {
            res.status(403)
            .json({
                status: 'error',
                data: {},
                message: 'invalid parameters'
            });
        } else {
            // see if the user exists
            Users.find({_id: userId}, function(err, user) {
                console.log(userId);
                console.log(user);
                
                if (user.length > 0) {
                    // see if store exists
                    Stores.find({_id: storeId}, function(err, store) {
                        if (store.length > 0) {
                            // valid
                            var newReview = new Reviews({
                                storeID: storeId,
                                userID: userId,
                                rating: rating,
                                comment: comment                                
                            });
                            newReview.save();
                            res.status(200)
                            .json({
                                status: 'success',
                                data: newReview,
                                message: 'review created'
                            });
                        } else {
                            res.status(403)
                            .json({
                                status: 'failed',
                                data: {},
                                message: 'invalid storeID'
                            });
                        }
                    });
                } else {
                    res.status(403)
                    .json({
                        status: 'failed',
                        data: {},
                        message: 'invalid userID'
                    });
                }
            });
        }
        
    });

    app.get('/review', function(req, res) {
        var userId = req.query.userID;
        var storeId = req.query.storeID;
        var id = req.query.id;
        var callback= function(err, reviews) {
            if (err) {
                res.status(404)
                .json({
                    status: 'error',
                    data: {},
                    message: 'failed'
                });
            } else {
                res.status(200)
                .json({
                    status: 'success',
                    data: reviews,
                    message: 'retrieved reviews'
                });
            }
        };

        if (userId) {
            Reviews.find({userID: userId}, callback);
        } else if (storeId) {
            Reviews.find({storeID: storeId}, callback);            
        } else {
            Reviews.find({_id: id}, callback);                        
        }      
    });

    // update the store's information
    app.put('/review', function(req, res) {
        var id = req.query.id;
        var rating = req.body.rating;
        var comment = req.body.comment;
        
        var callback = function(err, review) {
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
                    data: review,
                    message: 'updated' 
                });
            }
        }
        if (comment) {
            options = {rating: rating, comment: comment};
        } else {
            options = {rating: rating};
        }
        Reviews.findOneAndUpdate({_id: id}, options, {new: true}, callback); 
    });

    app.delete('/review', function(req, res) {
        var userId = req.query.userID;
        var storeId = req.query.storeID;
        var id = req.query.id;
        var callback= function(err, reviews) {
            if (err) {
                res.status(404)
                .json({
                    status: 'error',
                    data: {},
                    message: 'failed'
                });
            } else {
                res.status(200)
                .json({
                    status: 'success',
                    data: reviews,
                    message: 'deleted reviews'
                });
            }
        };

        if (userId) {
            Reviews.findOneAndRemove({userID: userId}, callback);
        } else if (storeId) {
            Reviews.findOneAndRemove({storeID: storeId}, callback);            
        } else {
            Reviews.findOneAndRemove({_id: id}, callback);                        
        }      
    });
};