//current installs 
//npm init
//npm install --save express body-parser
//npm install --save-dev nodemon, auto restart server on server side code change
//express validator npm install --save express validator
//npm install --save axios
//add nodemon script in package.json

//body-parser -> parses json body into javascript object ***

//routing - want to listen to certain http method and path combination and run different code
//route requests to certain requests 
//MIDDLEWARES PARSED FROM TOP TO BOTTOM OF THE FILE
//--------------------------------------------
//START THIS APP BY EXECUTING THE APP.JS FILE 
//--------------------------------------------
const express = require('express'); //store express functionality
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//importing configured router - this is a middleware
const placeRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');  //model we created 
const usersRoutes = require('./routes/user-routes'); //register as middleware
//const fileUpload = require('express-fileupload');

const app = express();

//parse any incoming request body and extract any json data and convert to regular js data structures
//and automatically call next -> next middleware is our own custom routes
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });
//configured routes added to middleware 
//path must start with this string 
//request to /api/places sent to router 
//A router behaves like middleware itself so it can be used as an argument
//the router uses controllers 
app.use('/api/places',placeRoutes);  //register router obect as a middleware to '/api/places/......
//app.use('/api/allplaces', placeRoutes);
app.use('/api/users',usersRoutes); // forward requests to user-routes.js

//middleware registered after routes
//error handling for unsuported routes 
//only reached if some response has not recieved req befort 
app.use((req,res,next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;
});
//4 parameters - recognized by express as an error handling middleware
//take requests where error was thrown
//triggered by throwing new error or next()
app.use((error,req,res,next) =>{
    if(res.headerSent){ //has response been sent 
        return next(error);
    }
    //no response has been sent yet
    res.status(error.code || 500);// 500 something went wrong on server
    res.json({message:error.message} || 'Unknown error has occured');
});

//DB CONNECTION, certain password, username, database ect..
//establishing connection with mongoose, next 
//nodemon.json -> environment variables
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@pointData.7oisrrw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`).then(()=>{
    app.listen(process.env.PORT || 5000);
}).catch(err => {
    console.log(err);
});
