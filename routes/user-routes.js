//register middleware responsible for user routes 

const express = require('express');
const {check} = require('express-validator');

const usersController = require('../controllers/users-controller');

//import http error class 
const HttpError = require('../models/http-error');

//making use of express router 
const router = express.Router(); //create new router object 

//connected with middleware  controller
/*
router.post('/signup', [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min: 6}) //Test@test.com => test@test.com
],usersController.signup);
*/
//route for login
router.post('/login', usersController.login);
//cannot get error basically no route is defined for the url
module.exports = router;