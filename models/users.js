const mongoose = require('mongoose');

//npm install --save mongoose-unique-validator
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{type:String, required:true},
    password:{type:String, required:true}
});

//userSchema.plugin(uniqueValidator)
//user collection
module.exports = mongoose.model('User', userSchema);