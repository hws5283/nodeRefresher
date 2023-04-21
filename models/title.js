
const mongoose = require('mongoose');


const titleSchema = new mongoose.Schema({
    title:{type:String,required:true},     
    ide:{type: Number, required: true}        
});


module.exports = mongoose.model('maptitle', titleSchema);  //SINGULAR version of collection name 