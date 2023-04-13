//CONTROLLERS FOCUES ON LOGIC AND MIDDLEWARE
//just a place holder 
//no need to import express not using any features from express 
//want to link these functions to routes registerd in different file 
const { reset } = require('nodemon');
const {validationResult} = require('express-validator'); 
const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location')
const Place = require('../models/place');           //the place mongoose model
const { default: mongoose } = require('mongoose');
const place = require('../models/place');
const cloudinary = require('../cloudinaryHelper/imageUpload'); //the configed cloudinary object 
const path = require('path');

//controller used to gather the rest of the information from markers (controller triggered on marker clicks)
const getPlaceByName = async(req,res,next) =>{
    const name = req.params.pointName;
    let point;
    try{
        point = await Place.findOne({title:name}).select(['title','img','description','link']);   //find doc with matching name 
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
   
    if(!place){
        //using MODEL HERE 
        const error = new HttpError('Could not find a place for the provided id. ', 404);
        return next(error);
    }

   
    res.json({place:place.toObject({getters:true}), Headers: "Access-Control-Allow-Origin: *"}); 
};


//get coordinates and titles of all documents, other data will be provided by other controllers 
const getAllPlaces = async(req,res,next)=>{
    let mapPlaces;
    try{
        mapPlaces = await Place.find({}).select(['yPoint','xPoint', 'title', 'area','-_id']);   //find all documents, only need title and coordinates 
    }catch(err){                                                                        //when this controller is called 
        const error = new HttpError('Could not get all documents', 500);
        return next(error);
    }
    res.json({mapPlaces:mapPlaces});   
}

//updates description of marker, data comes from form marker
const updatePlace = async(req,res,next) =>{
    const error = validationResult(req);
    const name = req.params.placeId;  //get name of point
    

    console.log(req.body);
}

//Form update controller 
const update = async(req,res,next) =>{
    
    const name = req.params.markerName; // name of marker from params
    let deliveryUrl = "";
    let point;

    try{
         point = await Place.findOne({title:name});    //try to find the point in the database
    }catch(err){
        const error = new HttpError('Something went wrong in the addImage controller', 500);
        return next(err);
    }

    //we have a point...
    if(point){
         //if we have an image file or files
        if(req.files){
            try{  //try to upload all images
                for(const file of req.files){
                    let dUri = file.buffer.toString('base64');
                    let send = 'data:image/jpeg;base64,'+ dUri;

                    const uploadResponse = await cloudinary.uploader.upload(
                        send,
                       {
                           upload_preset: 'ml_default'
                       }
                    )

                    if(uploadResponse){
                        deliveryUrl = uploadResponse.url;
                        point.img.push(deliveryUrl);            //add images
                    }
                }

            }catch(error){
                 console.log(error);
                res.status(500);
            }
        } 

        if(req.body.description){
            point.description = req.body.description;    //set description
        }

        if(req.body.link){
            point.link.push(req.body.link);       //add link
        }

        try{
            await point.save();                     //save point 
        }
        catch(err){
            const error = new HttpError("could not update place with form data", 500);
            return(err);
        }
        res.json({test: 'testing'});
    }
}
exports.getPlaceById = getPlaceById;
exports.getAllPlaces = getAllPlaces;
exports.updatePlace = updatePlace;
exports.getPlaceByName = getPlaceByName;
exports.update = update;
//exports.updatePlace = updatePlace;


