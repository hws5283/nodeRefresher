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
const fileUpload = require('../middleware/file-upload'); //multer object import 

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
router.post('/upload', placesControllers.addImage);                 //used for image upload with cloudinary 

module.exports = router;