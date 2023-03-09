const HttpError = require("../models/http-error");
const jwt = require('jsonwebtoken');
//allowing client to add authorization header->check app.js
module.exports = (req,res,next)=>{

    if(req.method === 'OPTIONS'){
        return next();
    }
    try{
        const token = req.headers.authorization.split(' ')[1];   //Authorization: 'Bearer TOKEN', split could fail and cause error(use try/catch)
        if(!token){
            throw new Error('Authentication failed!');
        }
        const decodedToken = jwt.verify(token, 'privateKey70999!!');        //must match seed value from login function ***
        //at this point we are authenticated!
        req.userData = {userId: decodedToken.userId};
        next();   //request continues -> able to reach protected routes
    }catch(err){
        const error = new HttpError('Authentication failed', 401);
        return next(error);
    }
   
};