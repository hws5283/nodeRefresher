//THIS FILE IS ALL ABOUT ROUTING AND MAPPING PATHS- FOCUSSED FILES
//MAPPING HTTP METHODS TO CONTROLLERS 
//configure router
//have to import in any file using express logic
//link this logic to the app.js file - run using npm start 
const express = require('express');

const {check} = require('express-validator');

const placesControllers = require('../controllers/places-controllers');

//import http error class 
const HttpError = require('../models/http-error');

//making use of express router 
const router = express.Router(); //create new router object 

//DEFAULT IN BROWSER IS A GET REQUEST 

//registering a route
//add http method route "get"
//path and function compo for parameters
//route filter auto added to where you add  middleware
//handles any request ending in /some id
//GET ROUTE 1 , get by id
//NOTE not executing controller here
//adding contoller to this route 
router.get('/:pid', placesControllers.getPlaceById);    //get one marker data for a specific mongo id
router.get('/', placesControllers.getAllPlaces);        //get all the documents in the collection (all marker point documents)
router.patch('/:placeId',placesControllers.updatePlace);   //update a specific markers information, have to restrict this route
router.get('/byname/:pointName', placesControllers.getPlaceByName);
//route and execution block 
//handles all requests on /api/place/user/any value
//api/place/user/ nothing works but returns nothing 
//GET ROUTE 2, get by creator

//middleware have access to the request object (req) and response object (res) 
//and the next middleware function (next)
//only intrested in get request -> same path as below doesnt matter 
//router.get('/user/:uid', placesControllers.getPlacesByUserId )


//connected with middleware  controller
//first argument filter (path), after not limited to one middleware - can register multiple on one path and http method
//some added validation for a new place - register middleware and
/*
router.post('/', 
[check('title').not().isEmpty(), 
check('description').isLength({min: 5}), 
check('address').not().isEmpty()], placesControllers.createPlace);
//exporting configured router 
*/
//only intrested in patch requests 

/*
router.patch('/:pid',
[check('title').not().isEmpty()], 
placesControllers.updatePlace );
*/
//router.delete('/:pid', placesControllers.deletePlace);

//cannot get error basically no route is defined for the url
module.exports = router;