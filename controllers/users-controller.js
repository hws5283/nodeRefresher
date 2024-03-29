//const uuid = require('uuid/v4');
//npm install bcrypt js - node js library helping create secure passwords (hash passwords)
//jsonwebtoken - allows generation of tokens with private key
const HttpError = require('../models/http-error');
const {validationResult} = require('express-validator');
const User = require('../models/users');
const bcrypt = require('bcryptjs');  //used to hash passwords(encrypt)
const jwt = require('jsonwebtoken'); //
//user login logic, can also use the token here 
//only one username and password for application -> the admin...
//we only need a login for this project....
//dont need validation middlewares here the login will fail in the form anyways 
const login = async(req,res,next) => {
    const {username,password} = req.body;  //plain text here
    
    let existingAdmin
    try{
        existingAdmin = await User.findOne({username:username})
    }catch(err){
        const error = new HttpError(
            'login failed'
        );
        return next(error);
    }

    //no user found for username provided 
    if(!existingAdmin){
        const error = new HttpError(
            'invalid credentials, could not login',
            401
        )
        return next(error);
    }

    let isValidPassword = false;            //initially falsy
    try{
        isValidPassword = await bcrypt.compare(password, existingAdmin.password);   //use bycrypt to compare plain text password to hashed one in db
    }catch(err){
        const error = new HttpError('password was invalid');
    }
    //validated password was correct

    //password was invalid 
    if(!isValidPassword){
        const error = new HttpError(
            'invalid credentials, could not login',
            401
        )
        return next(error);
    }
    //-------------------------------------------------------------------------------
    //IF WE MAKE IT HERE we know the username exists and the password was valid !!!
    //-------------------------------------------------------------------------------
    let token;
    try{
        token = jwt.sign(
            {userId: existingAdmin.id, username: existingAdmin.username},    //id generated by mongoose(generated for every mongodb document being worked with)
            process.env.JWT_KEY,
            {expiresIn:'1hr'}
        );
    }catch(err){
        const error = new HttpError(
            'login failed, try again later',
            500
        );
        return next(error);
    }

    //react application will be able to use and store token and attatch it to future
    //requests to routes in backend requiring authentication 
    res.json({
        userId: existingAdmin.id,
        username: existingAdmin.username,
        token: token                        //give token to response, this can allow the admin to access protected routes 
    });
};

exports.login = login;
