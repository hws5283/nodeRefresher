const httpMocks = require('node-mocks-http');

const send = require('../controllers/places-controllers')

describe("js fetch succesfully returning data from /api/places route", ()=>{
    test("should get all documents from db", ()=>{

        const request = httpMocks.createRequest({
            method: 'GET',
        });

        let response = httpMocks.createResponse();
    
        let test = send.getAllPlaces(request,response, (err)=>{expect(err).toBeFalsy});
        expect(test).toContain("mapPlaces");
    });
});