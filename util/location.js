const axios = require('axios');
const HttpError = require('../models/http-error');
const API_KEY = 'AIzaSyDzkNE7fgsRRt0K1a2oyR-tGLIQIfxt8KM';

//makes sure return value get wrapped into promise
async function getCoordsForAddress(address){

//sending get request to a url
//can inject dynamic segments into this url 
//sends get request to this url with dynamic segments
    const response = 
    await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);
    
    //axios gives .data field on response object
    const data = response.data;

    if(!data || data.status === 'ZERO_RESULTS'){
        const error = new HttpError('could not find location for specified address',422);
        throw error;
    }

    //no error 
    const coordinates = data.results[0].geometry.location;

    return coordinates;
}
//want to execute this in other files 
module.exports = getCoordsForAddress;
//axios for sending http requests from frontend apps to backends -
//CAN ALSO BE USED ON A NODE SERVER, want to send request from our server to another server