//const uuid = require('uuid/v4');
//npm install bcrypt js - node js library helping create secure passwords (hash passwords)
//jsonwebtoken - allows generation of tokens with private key
const HttpError = require('../models/http-error');
const {validationResult} = require('express-validator');
const User = require('../models/users');
const bcrypt = require('bcryptjs');  //used to hash passwords(encrypt)
const jwt = require('jsonwebtoken'); //

//used to create admin account 
const createAdmin = async(req,res,next)=>{

}
//user login logic, can also use the token here 
//only one username and password for application -> the admin...
//we only need a login for this project....
const login = async(req,res,next) => {
    const {username,password} = req.body;
    let existingUser;
    try{ 
        existingUser = await User.findOne({username:username});     //find matching username 
    }catch(err){
        const error = new HttpError(
            'Loggin failed try again later',
            500
        );
        return next(error);
    }
    //no user found
    if(!existingUser){
        const error = new HttpError(
            'Invalid credentials could not log in',
            401
        );
        return next(error);
    }

    let isValidPassword = false;
    try{
        //take plane text from request to the hashed password in db
        isValidPassword = await bcrypt.compare(password,existingUser.password);   //compare password
    }catch(err){
        const error = new HttpError('could not log you in, check credentials and try again',500);
        return next(error);
    }

    //password not valid 
    if(!isValidPassword){
        const error = new HttpError(
            'Invalid credentials, could not log you in.', 401
        );
        return next(error);
    }
    //generate token 
    let token;
    try{
        //can even store data in the token 
        token = jwt.sign({userId:createdUser.id, email:createdUser.email},'supersecret_dont_share',{expiresIn:'1h'});
    }catch(err){
        const error = new HttpError(
            'loging in failed, try again later',
            500
        );
        return next(error);
    }
    res.json({userId: existingUser.id, email: existingUser.email, token:token});
};

exports.login = login;
