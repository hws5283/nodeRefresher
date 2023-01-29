const express = require('express');
const bodyParser = require('body-parser')
const app = express();   

//3rd party middleware for express 
//body-parser ready to use middlewares to use in express apps to parse incoming request bodies
//makes writing these apps easier

//registering middleware - philosophy of express - every incoming req is thrown through middleware funcs
//use provided by express
//req - incoming request
//res - 
//next  - want to forward request to next middleware and are not sending a response here

//callback functions are not immediatly executed by nodemon ** - only executed once called
//let express set up logic that executes when req reaches a server and meets criteria 
app.use(bodyParser.urlencoded({extended:false}));

//triggers on incoming post request - http verb being post
app.post((req,res,next) =>{
    res.send('<h1>User: ' + req.body.username + '</h1>');
});

app.use((req,res,next) => {
    let body = '';
    req.on('end', () => {
        const userName = body.split('=')[1];

        if(userName){   //if username exists set body
            req.body = {name:userName};
        }
        next(); //go to next middleware, next refers to the next middleware block

    });

    req.on('data', chunk =>{
        body+= chunk;
    });
});


//second middleware
app.use((req, res, next)=> {

    //if name was inputed 
    if(req.body) {
        return res.send('<h1>' + req.body.name + '</h1>');   //return a header with that username 
    }
    res.send('<form method = "POST"><input type = "text" name = "username"><button type = "submit">button</button></form>'); //send http response
});

app.listen(5000);   //no need to create server 