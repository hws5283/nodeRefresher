//globally available by node js*
//nodemon - powered by nodejs executing javafiles with nodejs and watch all files in project folder
//restarting server on change 

//body parser
const fs = require('fs'); //only available in nodejs environment

//regular js code 
const userName = 'Max';

fs.writeFile('user-data.txt', 'Name: ' + userName, (err) =>{
    if(err){
        console.log(err);
        return;
    }

    console.log('wrote to file')
});
