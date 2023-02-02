//CONTROLLERS FOCUES ON LOGIC AND MIDDLEWARE
//just a place holder 
//no need to import express not using any features from express 
//want to link these functions to routes registerd in different file 
const { reset } = require('nodemon');
const {validationResult} = require('express-validator');
const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location')
const Place = require('../models/place');
const { default: mongoose } = require('mongoose');
const place = require('../models/place');

const getPlaceByName = async(req,res,next) =>{
    const name = req.params.pointName;

    let point;

    try{
        point = await Place.findOne({title:name});   //find doc with matching name 
    }catch(err){
        const error = new HttpError('couldnt find place with that name ', 500);
        return next(error);
    }

    if(!point){
        const error = new HttpError('coulding find place with that name', 404);
        return next(error);
    }

    res.json({placebyName: point.toObject({getters:true})});
}
//get marker data for specific id 
const getPlaceById = async(req,res,next)=>{
    //params added by expressjs
    const placeId = req.params.pid;//gets info from url
    //no promise returned 
    let place;
    try{
        place = await Place.findById(placeId);
    }catch(err){
        //get request has problem
        const error = new HttpError(
            'something went wrong could not find place ', 500
        );
        return next(error);
    }
    //error handling for not finding a document in database
    if(!place){
        //using MODEL HERE 
        const error = new HttpError('Could not find a place for the provided id. ', 404);
        return next(error);
    }

    //sending back json data, takes any data able to be formed into valid json
    res.json({place:place.toObject({getters:true}), Headers: "Access-Control-Allow-Origin: *"}); //or just {place}
};


//get all marker data (all documents in db)
const getAllPlaces = async(req,res,next)=>{
    let mapPlaces;
    try{
        mapPlaces = await Place.find({});   //find all documents 
    }catch(err){
        const error = new HttpError('Could not get all documents', 500);
        return next(error);
    }
    res.json({mapPlaces:mapPlaces});   //return all marker documents in a list 
}

//update a specific markers information (change description and photo...) WE WANT TO RESTRICT THIS ROUTE
const updatePlace = async(req,res,next) =>{
    const error = validationResult(req);
    const name = req.params.placeId;  //get name of point
    console.log(name);
    if(!error.isEmpty()){
        return next(new HttpError('invalid inputs passed', 422));
    }

    const newDescription = req.body; //get description from request 
    console.log(newDescription);

    let place;
    try{
        place = await Place.findOne({title:name});   //using the mongoose shema, find the place by the id
        console.log(place);
    }catch(err){
        const error = new HttpError('someting went wrong while updating', 500);
        return next(error);
    }

    place.description = newDescription.newDescription; //set new description, have to use field name here, schema only expects string not object 

    try{
        await place.save();   //save the update
    }catch(err){
        const error = new HttpError('could not update place', 500);
        return next(error);
    }

    res.status(200).json({place:place.toObject()});  //just log the document 

}

/*
const getPlacesByUserId = async (req,res,next)=>{
    const userId = req.params.uid;

    let places;
    try{
        places = Place.find({creator:userId});
    }catch(err){
        const error = new HttpError('fetching places failed', 500);
    }
    if(!places || places.length === 0){
        return next(
            new HttpError('Could not find a places with provided user id. ', 404)
        );   //triggers error handling middleware
    }
    res.json({places});
};

//middleware function connected to route
//has validation
const createPlace = async(req,res,next) =>{
    const errors = validationResult(req);  //give req to validation result, based on setup in app.js
    if(!errors.isEmpty()){
        console.log(errors);
        //return here to not execute the rest of this function block
        return next(new HttpError('invalid inputs passed check data', 422));
    }

    //post requests have a body!!
    //object destructuring - these fields expected in body of request
    const {title,description,address,creator} = req.body;
    //shortcut for const title = req.body.title...ect

    let apiCoordinates;
    try{
        //use of an api 
         apiCoordinates = await getCoordsForAddress(address);
    }catch(error){
        //forward error
        //return so no other code runs here 
        return next(error);
    }
    //creating new place object with the mongoose model
    //fields in model MUST MATCH SCHEMA FIELDS
    const createdPlace = new Place({
        title,
        description,
        address,
        location: apiCoordinates,
        image:"https://th.bing.com/th/id/R.936e89698fcd90a0efa3584b080502d4?rik=tQGQ2SoXeIrkhg&pid=ImgRaw&r=0",
        creator
    });

    try{
        //call save on the model instance !
        await createdPlace.save();

    }catch(err){
        const error = new HttpError(
            'creating place failed',
            500
        );
        return next(error);
    }

    //save available by mongoose, handles all mongodb code to store document in collection 
    await createdPlace.save();

    console.log(createdPlace);
    res.status(201).json({place:createdPlace}); // send back message status code and new object

};

//some data part of url and some part of data 
//valid updating middleware
//some middleware functions 
const updatePlace = async(req,res,next) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }
    //no errors ? continue with normal updating logic 
    const {title,description} = req.body;
    const placeId = req.params.pid;

    //identify place and update it 
    let place;
    try{
        place = await Place.findById(placeId);
    }catch(err){
        const error = new HttpError('something went wrong could not update place',500);
        return next(error);
    }


    place.title = title;
    place.description = description;

    try{
        await place.save();
    }catch(err){
        const error = new HttpError('could not update place',500);
        return next(error); //make sure code execution is interupted
    }
    //send back status message - return updated place 
    res.status(200).json({place:place.toObject({getters:true})});
};
const deletePlace = (req,res,next) =>{
    const placeId = req.params.pid;
    if(!DUMMY_PLACES.find(p=>p.id===placeId)){
        //throw error and dont execute rest of code block
        throw new HttpError("could not find a place for that id",404);
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p=> p.id !== placeId);
    res.status(200).json({message: "deleted place"});
};
*/
//exporting functions for use elsewhere in application
exports.getPlaceById = getPlaceById;
exports.getAllPlaces = getAllPlaces;
exports.updatePlace = updatePlace;
exports.getPlaceByName = getPlaceByName;
//exports.updatePlace = updatePlace;


