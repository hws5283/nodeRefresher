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
const cloudinary = require('../cloudinaryHelper/imageUpload'); //the configed cloudinary object 
const streamifier = require('streamifier');


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

//updates description 
const updatePlace = async(req,res,next) =>{
    const error = validationResult(req);
    const name = req.params.placeId;  //get name of point
    if(!error.isEmpty()){
        return next(new HttpError('invalid inputs passed', 422));
    }

    const newDescription = req.body.description; //get description from request 
    console.log(newDescription);

    let place;
    try{
        place = await Place.findOne({title:name});   
        console.log(place);
    }catch(err){
        const error = new HttpError('someting went wrong while updating', 500);
        return next(error);
    }

    place.description = newDescription //set new description, have to use field name here, schema only expects string not object 

    try{
        await place.save();   //save the update
    }catch(err){
        const error = new HttpError('could not update place', 500);
        return next(error);
    }
    
    res.status(200).json({place:place.toObject()});  //just log the document 

}

const addImage = async(req,res,next) =>{
    try{
        const fileStr = req.body.data;      //the image string
        if(!fileStr){
            console.log("no file sent ");
        }
        const uploadResponse = await cloudinary.uploader.upload(
            fileStr,{
                upload_preset: 'ml_default'
            }
        )

        console.log(uploadResponse);
    }catch(error){
        console.log(error);
        res.status(500);
    }
}

exports.getPlaceById = getPlaceById;
exports.getAllPlaces = getAllPlaces;
exports.updatePlace = updatePlace;
exports.getPlaceByName = getPlaceByName;
exports.addImage = addImage;
//exports.updatePlace = updatePlace;


