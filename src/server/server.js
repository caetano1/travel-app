// This serves to not to expose the credentials in the public repo
const dotenv = require('dotenv');
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require the API functions, defined in the other files
const getExternalData = require('./getExternalData');


// Require fs to read the JSON file containing the countries' list
const fs = require('fs');

let countriesData = fs.readFileSync('countries.json');
let countries = JSON.parse(countriesData);

/* Middleware*/
//Here we are configuring express to use express, body-parser and cors as middle-ware.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const port = 3030;
const server = app.listen(port, listening);

function listening() {
    console.log(`Local server is running on port ${port}`);
}

/* Routing */
// defines the GET route which fetches the country information
app.get('/getGeolocation', geodataApi);

function geodataApi(req, res) {

    const endpointGeo = 'http://api.geonames.org/searchJSON'
    const queryGeo = `?q=${req.body.queryTerm}`;
    const country = `&country=${req.body.country}`;
    
    // For debugging reasons
    /* const queryGeo = '?q=london';
    const country = `&country=GB`; */
    const maxRowsGeo = '&maxRows=10';
    const usernameGeo = `&username=${process.env.USERNAMEGEO}`;

    const urlGeo = `${endpointGeo}${queryGeo}${country}${maxRowsGeo}${usernameGeo}`
    console.log(urlGeo);

    const resGeo = getExternalData(urlGeo, use='Geocoordinates')
        .then( (data) => {
            res.send(data);
        })

    console.log({ status: 200, responseBody: resGeo, responseMessage: 'Data retrieved'});
}

module.exports = { geodataApi }

// defines the POST route
app.post('/addEntry', addEntry);

function addEntry (req, res) {
    console.log(req.body);
    projectData = {
        date: req.body.date,
        zipCode: req.body.zipCode,
        feelings: req.body.feelings,
        temp: req.body.temp,
    };
    res.send({ code: 200, responseMessage: 'Data registered'});
};

// defines the GET route for the countries data
app.get('/countries', fetchCountries);

function fetchCountries (req, res) {
    res.send(countries);
};