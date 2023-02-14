require('dotenv').config();
const cloudinary = require('cloudinary').v2;   //REQUIRE CLOUDINARY SDK

cloudinary.config({                             //config sdk with credentials 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


module.exports = cloudinary;


//configuring cloudinary object
//cloud name not private
//api key isnt really private either 