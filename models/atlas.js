const mongoose = require('mongoose');


const atlasSchema = new mongoose.Schema({
    title:{type:String,required:true},  
    area: {type:String, required:true},   
    ide:{type: Number, required: true},  
    icon:{type:String, required:true}      
});


module.exports = mongoose.model('mapatlasentries', atlasSchema);  //SINGULAR version of collection name 