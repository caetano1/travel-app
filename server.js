// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Require fs to read the JSON file containing the countries' list
const fs = require('fs');

let countriesData = fs.readFileSync('countries.json');
let countries = JSON.parse(countriesData);

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;

const server = app.listen(port, listening);

function listening() {
    console.log(`Local server is running on port ${port}`);
}

/* Routing */
// defines the GET route for the project data
app.get('/data', getData);

function getData(req, res) {
    res.send(projectData);
    console.log({ status: 200, responseBody: projectData, responseMessage: 'Data retrieved',})
}

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