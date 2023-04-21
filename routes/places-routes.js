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
const multurUploads = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

//DEFAULT IN BROWSER IS A GET REQUEST 

//registering a route
//add http method route "get"
//path and function compo for parameters
//route filter auto added to where you add  middleware
//handles any request ending in /some id
//GET ROUTE 1 , get by id
//NOTE not executing controller here
//adding contoller to this route 
//"routing" - how is this application responding to a client request to a particular endpoint???
//add middleware and routes....SEE MULTER MODULE
//UNPROTECTED ROUTES
router.get('/titles', placesControllers.getMarkerTitles);
router.get('/:pid', placesControllers.getPlaceById);    //get one marker data for a specific mongo id
router.get('/', placesControllers.getAllPlaces);        //get all the documents in the collection (all marker point documents)
router.get('/byname/:pointName', placesControllers.getPlaceByName);
//registering multiple middlewares on http method/path combination
//executed left -> right

//handle token issues here, REQUEST MUST HAVE A TOKEN HERE AND GET THROUGH THE MIDDLEWARE
router.use(checkAuth);
//ANY ROUTE AFTER ABOVE LINE WILL NEED AUTHENTICATION
//ONLY 1 PROTECTED ROUTE
router.post('/upload/:markerName',multurUploads,
    //,[
    //check('file').not().isEmpty()||
    //check('description').not().isEmpty()
    //],
    placesControllers.update
);    //used for image upload with cloudinary 
                                                                        //loading in multer middleware at router level

module.exports = router;