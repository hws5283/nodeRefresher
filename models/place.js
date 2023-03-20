//the schema for mongoose
const mongoose = require('mongoose');

const schema = mongoose.Schema;

//logic for blueprint
//image is always a URL IN THE DATABASE NOT A FILE
//THE SCHEMA 
const placesShema = new mongoose.Schema({
    title:{type:String,required:true},              //schema valiation at application level 
    yPoint: {type:Number, required: true },
    xPoint:{type:Number, required: true},
    img: {type:Array, required:false},               //changed to array
    description:{type:String, required:true},
    area:{type:String, required: true},
    link: {type:Array, required: false}
});


//THE MODEL
module.exports = mongoose.model('Place', placesShema);