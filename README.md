# Assignment 2: Backend

With the raising popularity of rating apps from restaurants to games to [people](https://www.youtube.com/watch?v=CI4kiPaKfAE), for this assignment we'll create a simple store rating app. Your job is to implement a RESTful API that allows ratings and stores able to be CRUD (Create, Read , Update , Delete). For the simplicity of this assignment, we'll do without user authentication as well as only having very simple functions. This is mainly to get your feet wet with making a full stack application.

Although there are a lot of [backend](https://en.wikipedia.org/wiki/Comparison_of_application_servers) ([Rails](http://rubyonrails.org/), [Django](https://www.djangoproject.com/), [ASP.NET](http://asp.net), [Perfect](http://perfect.org)) and [database](http://db-engines.com/en/ranking) ([PostGreSQL](https://www.postgresql.org/), [Cassandra](http://cassandra.apache.org/), [Redis](https://redis.io/)) options out there, you must use [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/) for this assignment (this is for standardisation for grading). You may choose to use [Express](http://expressjs.com/), [Mongoose](http://mongoosejs.com/), [React](https://facebook.github.io/react/) or anything else if you wish in the backend. Since the backend will be autograded, please ensure your routes works exactly as specified.

This assignment is individual. As for the front end, you may choose to use any styling ([Bootstrap](http://getbootstrap.com/), [JqueryUI](http://jqueryui.com/), [Font Awesome](http://fontawesome.io/) etc.) or Javascript ([Angular](https://angularjs.org/), [React](https://facebook.github.io/react/), [JQuery](http://jquery.com/), [Ember](http://emberjs.com/), etc.) library you wish as long as the TAs are able to open and the interface is intuitive. 

### REST Specification
To make marking simpler, we will be only doing these 3 commands when marking 

`mongod --dbpath=./data/` - this starts the mongodb server

In another console

`npm install` - this will install all your packages you may have imported

`npm start` - this will start your app. The reason why we're not just using `node app.js` is because this is more universal if someone is using express engine. To get this command working, add a new key to your `package.json` with 
`  "scripts": {"start": "node app.js"}`

Your `package.json` should look something like
~~~~javascript
{ 
    "name": "App Name here"
...
    "scripts":{
        "start": "Your start command here"
    }
    "dependencies":{
    ...
    }
}
~~~~

Lastly, make sure your app is bind to port 3000, so when we call `localhost:3000` we can access your front end.

#### Users (10%)

Your RESTful API should be able to CRUD users (what kind of rating app would it be with no users?). The JSON specifications of a user is below under `POST /users`.

 - `GET /users`  Get all the users, ordered by username ascending, in an array in the key `users`
 - `GET /users?query` Same as above and filtered (exact) by the possible query:
    - `firstname`
    - `lastname`
    - `age`
    - `sex`
An example would be `/users?firstname=Tom&sex=M` could return
~~~~javascript
{
"users": [
        {   
            "_id": "4723",
            "username": "gump1994",
            "firstname":"Tom",
            "lastname":"Hanks",
            "sex": "M",
            "age": 60
        },
        {   
            "_id": "572",
            "username": "h0rcrux",
            "firstname":"Tom",
            "lastname":"Riddle",
            "sex": "M",
            "age": 71
        },
        {   
            "_id": "192",
            "username": "m1ssionP0zzible",
            "firstname":"Tom",
            "lastname":"Cruise",
            "sex": "M",
            "age": 54
        }
    ]
}
~~~~

#### Individual Users (15%)
Here’s the part where we want to be able to get and modify users.

- `POST /user` - In the body of the post request, supply all required fields and support any optional fields. See below on the schema required. If the username provided already exist or not provided, return a 403 status. If the request is valid, return a 200 status with the new user returned.
NOTE: There are multiple ways to go about making a username unique. Your `_id` field therefore may be different from above but ensure your `username` field is always there! 

 ~~~~javascript
 {   
    "_id": {type:String}, //Will be different depending on your implementation, could be Number
    "username": {type: String, required:true, unique:true},
    "firstname":  {type: String, default:""},
    "lastname": {type: String, default:""},
    "sex":  {type: String, default:""},
    "age": {type: Number, default: 0}
}
~~~~

- `GET /user?id=` - Get a user by a specific ID. All objects therefore must have a `_id` field. If the ID given does not exist, return a 404 status.

An example would be `/user?id=192` could return

 ~~~~javascript
 {   
    "_id": "192",
    "username": "m1ssionP0zzible",
    "firstname":"Tom",
    "lastname":"Cruise",
    "sex": "M",
    "age": 54
}
~~~~

- `GET /user?username=` - Get a user by a specific username. If the username given does not exist, return a 404 status.

An example would be `/user?username=m1ssionP0zzible` could return

 ~~~~javascript
 {   
    "_id": "192",
    "username": "m1ssionP0zzible",
    "firstname":"Tom",
    "lastname":"Cruise",
    "sex": "M",
    "age": 54
}

~~~~

- `DELETE /user?id=`  -Deletes a user by a specific ID. Return 404 if the user doesn't exist. When deleting a user, also delete their reviews. (See below).
`/user?id=192` would remove the user with 192 as their id. Calling it again would result a 404 response.

- `PUT /user?id=` - Updates an already existing user via the body. If the username key is passed as well, ignore the username key. If the user doesn't exist, return a 404 error. If the request is valid, return a 200 with the updated user returned. We'll assume all fields passed are fields in the user schema.
Example Before:

~~~~javascript
{   
    "_id": "231",
    "username": "TotallyNotAFakeUser",
    "firstname":"Nigerian",
    "lastname":"Prince",
    "sex": "M",
    "age": 174
}
~~~~

`PUT /user?id=231` with body:
~~~~ javascript
{ 
    "username":"shouldNotChange",
    "firstname":"HongKong",
    "lastname":"banker",
    "age": 28
}
~~~~
The database nows looks like and should return:
~~~~ javascript
{   
    "_id": "231",
    "username": "TotallyNotAFakeUser",
    "firstname":"HongKong",
    "lastname":"banker",
    "sex": "M",
    "age": 28
}
~~~~

#### Stores (10%)

 - `GET /stores`  Get all the stores, ordered by storename ascending (by ID ascending if a tie), in an array in the key `stores`
 - `GET /stores?query` Same as above and filtered (exact) by the query:
    - `category`
    - `storename`

An example would be `/stores?category=department` could return
~~~~javascript
{
"stores": [
        {   
            "_id": "4231",
            "storename": "gartet",
            "category":"department",
            "Address":"123 Steals Avenue"
        },
        {   
            "_id": "133",
            "storename": "mallWart",
            "category":"department",
            "Address":"405 Blore Street"
        },
        {   
            "_id": "431",
            "storename": "mallWart",
            "category":"department",
            "Address":"83 Dawn Mills Road"
        },
        {   
            "_id": "192",
            "storename": "One Square",
            "category":"department",
            "Address":"831 Young Street"
        }
    ]
}
~~~~

#### Individual Stores (10%)
For stores, chains may share the same name. Therefore, their only identifier is their `_id`.

- `POST /store` - In the body of the post request, supply all required fields and include any optional fields. See below on the schema required. Return a 200 if the request is valid with the newly created store. Return a 403 if no storename is provided or the storename is blank.
 ~~~~javascript
{
    "_id": {type:String}, 
    "storename": {type: String, required:true},
    "department":  {type: String, default:""},
    "address": {type: String, default:""}
}
~~~~

- `GET /store?id=` - Get a store by a specific ID. All objects therefore must have a `_id` field. If the ID given does not exist, return a 404 status.
An example would be `/store?id=192` could return
 ~~~~javascript
{   
    "_id": "192",
    "storename": "One Square",
    "category":"department",
    "Address":"831 Young Street"
}
~~~~~

- `DELETE /store?id=`  -Deletes a store by a specific ID. Return 200 status if the store exists. Return 404 if the store doesn’t exist. When deleting a store, also delete their reviews. (See below).
`/store?id=192` would remove the store with 192 as their id. Calling it again would result a 404 response.

- `PUT /store?id=` - Updates an already existing store via the body. If the store doesn't exist, return a 404 error. We'll assume all fields passed are fields in the store schema. Return a 200 if the request is valid with the updated store.
Example Before:
~~~~javascript
{   
    "_id": "192",
    "storename": "One Square",
    "category":"department",
    "Address":"831 Young Street"
}
~~~~
`PUT /store?id=192` with body:
~~~~ javascript
{   
    "storename": "One Square Budson's Hay",
    "category":"clothing"
}
~~~~
The database nows looks like and should return:
~~~~ javascript
{   
    "_id": "192",
    "storename": "One Square Budson's Hay",
    "category":"clothing",
    "Address":"831 Young Street"
}
~~~~

#### Reviews (15%)
Finally to the good parts. We need user ratings for a rating app ([Have you ever had shoes without shoe strings?](https://genius.com/3392)). When a user or store gets deleted, delete all reviews involving the user or store respectively.

- `POST /review` - A post request must have both the userID and the storeID. A rating must be between 0 to 10 inclusive. Return a 403 status if either store or user does not exist or rating is not between 0 to 10 or the combination of userID and storeID review already exist.  Below is a schema of a review. Return a 200 if the request is valid with the newly created review.
~~~~javascript
{
    "_id": {type:String}, 
    "userID": {type: String, required:true},
    "storeID":  {type: String, required:true},
    "rating": {type:Number, required:true},
    "comment":{type:String}
}
~~~~

- `GET /review?id=`- Get the review with the corresponding ID. If the id does not exist, return a 404 status. 

Example `/review?id=123`
~~~~javascript
{
    "_id":"123",
    "userID":"123",
    "storeID":"456",
    "rating":0,
    "comment": ""
}
~~~~

- `GET /review?storeid=`- Get all reviews with the corresponding storeID, sorted by rating then `_id` ascending. Even if the storeid does not exist, return an empty reviews array. It should return a JSON object with reviews in an array under the key `reviews`.

Example

`GET /review?storeid=132`
~~~~javascript
{
    "reviews": [
        {
            "_id":"231",
            "userID": "894",
            "storeID":"631",
            "rating": 4,
            "comment": "No one respects the 'Quiet Study Space' on the second floor :("
        },
        {   "_id":"152",
            "userID": "1256",
            "storeID":"631",
            "rating": 8,
            "comment": "Building is beautiful, the people inside unfortunately smell..."
        },
        {   "_id":"315",
            "userID": "5313",
            "storeID":"631",
            "rating": 8,
            "comment": "If only they have some windows and macs around!"
        },
        {   "_id":"426",
            "userID": "1256",
            "storeID":"631",
            "rating": 10,
            "comment": "Love the supply of soylents and ice cream sandwiches on hand!"
        }
    ]
}
~~~~

- `GET /review?userid=` - Similar to storeid, but for users:

Example `GET /review?userid=5123`
~~~~javascript
{
    "reviews": [
            {   "_id":"152",
            "userID": "5123",
            "storeID":"631",
            "rating": 2,
            "comment": "' OR '1'='1'"
        },
        {   "_id":"315",
            "userID": "5123",
            "storeID":"421",
            "rating": 8,
            "comment": "<script type=\"text/javascript\">alert(\"HACKED!\")</script>"
        },
        {   "_id":"426",
            "userID": "5123",
            "storeID":"6731",
            "rating": 10,
            "comment": "\n\n\n\n\n"
        }
		]
}
~~~~

- `DELETE /review?id=` - Delete the review with the corresponding ID. If the id does not exist, return a 404 status. 
- `DELETE /review?storeid=` - Delete all reviews with the corresponding storeID. If the storeID does not exist, return a 404 status. 
- `DELETE /review?userid=` - Delete all reviews with the corresponding userID. If the userID does not exist, return a 404 status. 
- `PUT /review?id=` - Modify a review. Do not modify the storeID or userID (ignore the field). If the review doesn't exist, return a 404 status. Return a 200 with the updated review if successful.
Example 

Before
~~~~javascript
{
    "_id":"531",
    "storeID":"132",
    "userID":"152",
    "rating":3,
    "comment":""
}
~~~~

`PUT /review?id=531`
~~~~javascript
{
    "userID":"42",
    "rating":5,
    "comment":"insert text here"
}
~~~~

After and to return:
~~~~javascript
{    
    "_id":"531",
    "storeID":"132",
    "userID":"152"
    "rating":5,
    "comment":"insert text here"
}
~~~~

Congratulations! You have finished building the backend of your rating app!
#### Front End (20%)
The frontend should provides a list of possible operations to the user. You can think of this list a navigation menu. Basically, for every backend endpoint, there is some way in the front end that can fully utilize that backend. The list of front end functions could be:

- CRUD individual users
- CRUD individual stores
- Read list of users and stores with or without queries
- CRUD reviews

Some menu items require additional information from the user before the request can be made to the server. You can use a prompt box or some other mechanism to get the user to enter the information before submitting the HTTP request.

You have two main options for the views. One is to have a single HTML file that is updated via AJAX calls using JavaScript (or jQuery). The other is to have a separate HTML file (page) for the results of each operation. Whichever method you use, you should ensure that the user can see the main menu items at all times.

Minimal styling using CSS is required. You should spend only a small amount of time on adding style to the website.

Note that the grade for this component is largely for the JavaScript/jQuery required to update the data displayed.

#### Programming style (10%)
Good REST design and the usual attributes of good programming style. Make sure as well to comment and document your code as well as modularize if necessary. 
#### Creativity and Design (10%)
This is an opportunity for you to do little extra. It could be doing some extra work on the design of the views, particularly good error handling, tests for your REST API, or something else that you come up with. Please note that the graders will be very stingy with these marks if the basic functionality is not complete or well-implemented. Do not change any of the specifications of the backend where it would be tested (you can add extra endpoints though!)
Some ideas include:
- Displaying the average review for a store or user
- Changing the front end display / responsive design
- Get the number of categories and display them as well
