//the schema for mongoose
const mongoose = require('mongoose');

const schema = mongoose.Schema;

//logic for blueprint
//image is always a URL IN THE DATABASE NOT A FILE
//THE SCHEMA 
const placesShema = new mongoose.Schema({
    title:{type:String,required:true},
    yPoint: {type:Number, required: true },
    xPoint:{type:Number, required: true},
    img: {type:Array, required:false},               //changed to array
    //address:{type:String, required:true},            CAUSING UPDATE ERROR, DOES NOT MATCH THE MONGODB EQUIVALENT
    description:{type:String, required:true},
    link: {type:Array, required: false}
});

//1. name of model
//2. schema for model
module.exports = mongoose.model('Place', placesShema);