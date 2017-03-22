var Users = require('../models/User');

module.exports = function(app) {
    
    // get all the users
    app.get('/users', function(req, res) {
        var firstname = req.query.firstname;
        var lastname = req.query.lastname;
        var age = req.query.age;
        var sex = req.query.sex;

        var length = Object.keys(req.query).length;
        
        var callback =  function(err, users) {
            if (err) {
                res.status(404)
                    .json({
                        status: 'error',
                        data: {},
                        message: err
                    });
            } else {
                res.status(200)
                    .json({
                        status: 'success',
                        data: users,
                        message: "Successfully filtered users"
                    });
            }
        };
        // case 1: no filters
        if (length == 0) {
            Users.find({}).sort({username: 1}).exec(callback);
        // case 2: 1 fiter given
        } else if (length == 1) {
            if (firstname) {
                Users.find({firstname: firstname}, callback);
            } else if (lastname) {
                Users.find({lastname: lastname}, callback);                
            } else if (age) {
                Users.find({age: age}, callback);                
            } else if (sex) {
                Users.find({sex: sex}, callback);                
            } 
        // case 3: 2 filters given
        } else if (length == 2) {
            if (firstname && lastname) {
                Users.find({firstname: firstname, lastname: lastname}, callback);                
            } else if (firstname && age) {
                Users.find({firstname: firstname, age: age}, callback);                                
            } else if (firstname && sex) {
                Users.find({firstname: firstname, sex: sex}, callback);                                
            } else if (lastname && age) {
                Users.find({lastname: lastname, age: age}, callback);                                
            } else if (lastname && sex) {
                Users.find({lastname: lastname, sex: sex}, callback);                                
            } else if (age && sex) {
                Users.find({age: age, sex: sex}, callback);                                
            } 
        // case 4: 3 filters given
        } else if (length == 3) {
            if (!firstname) {
                Users.find({lastname: lastname, age: age, sex: sex}, callback);
            } else if (!lastname) {
                Users.find({firstname: firstname, age: age, sex: sex}, callback);                
            } else if (!age) {
                Users.find({lastname: lastname, firstname: firstname, sex: sex}, callback);                
            } else if (!sex) {
                Users.find({lastname: lastname, firstname: firstname, age: age}, callback);                
            }
        } else {
            // apply all the filters
            Users.find({lastname: lastname, firstname: firstname, sex: sex, age: age}, callback);                
            
        }
        
    });

    // get the user by id or username
    app.get('/user', function(req, res) {
        var id = req.query.id;
        var username = req.query.username;
        var callback =  function(err, users) {
            if (err) {
                res.status(404)
                    .json({
                        status: 'error',
                        data: {},
                        message: err
                    });
            } else {
                res.status(200)
                    .json({
                        status: 'success',
                        data: users,
                        message: "Successfully filtered users"
                    });
            }
        };
        
        if (username) {
            Users.find({username: username}, callback);                                
        } else {
            Users.find({_id: id}, callback);                                                
        }
    });

    // create a new user if it doesn't exist
    app.post('/user', function(req, res) {
        var username =  req.body.username;
        var firstname =  req.body.firstname;
        var lastname =  req.body.lastname;
        var age =  req.body.age;
        var sex =  req.body.sex;
        if (!username) {
            res.status(403)
            .json({
                status: "failed",
                data: {},
                message: "no username provided; cannot create user"
            })
        }
        Users.find({username: username}, function(err, users) {
            if (users.length == 0) {
                var newUser = new Users({
                    username: username,
                    firstname: firstname,
                    lastname: lastname,
                    age: age,
                    sex: sex
                });

                newUser.save();
                res.status(200)
                .json({
                    status: 'success',
                    data: {},
                    message: 'User created'
                });
            } else {
                res.status(403)
                .json({
                    status: 'error',
                    data: {},
                    message: err
                });
            }
        });
    });

    // update the user's information
    app.put('/user', function(req, res) {
        var id = req.query.id;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var age = req.body.age;
        var sex = req.body.sex;
        
        Users.findOneAndUpdate({_id: id}, {firstname: firstname, lastname: lastname, age: age, sex: sex}, function(err) {
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
                    data: {},
                    message: 'updated' 
                });
            }
        }); 
    });

    // delete a user
    app.delete('/user', function(req, res) {
        var id = req.query.id;
        console.log(id);
        Users.findOneAndRemove({_id: id}, function(err) {
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
                    message: 'deleted the user' 
                });
            }
        }); 
    });
};