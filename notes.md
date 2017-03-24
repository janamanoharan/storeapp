# Notes for the Marker

## How to start the app
1. Checkout repo
2. Have three terminals open
3. Use one to run mongod
4. Use another to cd into the ```/dev/backend``` directory
5. Run command ```npm install```
6. Run command ```npm run setup```. (this will populate the database with some users and stores, skip this step if you already have your own data)
7. Run command ```npm start``` The backend server is now running at port 8080 
8. Use the last to cd into the ```/dev/frontend``` directory
9. Run command ```npm install```
10. Run command ```npm start``` The frontend server is now running at port 3000
11. Enter ```localhost:3000``` in a browser of your choice to start using the app.

## Things I have implemented
### Backend
I have implemented all the CRUD methods that are required for this assignment.
### Frontend
1. Login (```GET /user```)
2. Register (```POST /user```)
3. View all users (```GET /users```),(```GET /users?query```)
4. Delete account (```DELETE /user```)
5. View all stores (```GET /stores```), (```GET /stores?query```)
6. Insert a Store (```POST /store```)
7. Post a review (```POST /review```)
8. Get all reviews (```GET /review?query```)
9. Get avaerage rating for a store (```GET /review?query```)

## Methods that aren't hooked to the frontend
1. (```PUT /user```) - Design decision to not be able to change user information
2. (```PUT /store```) - Didn't make sense to have this feature with respect to the app
3. (```PUT /review```) - Didn't make sense to have this feature with respect to the app
4. (```DELETE /review```) - Design decision to not be able to delete reviews as they are needed for the stores



