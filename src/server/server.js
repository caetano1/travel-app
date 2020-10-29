// This serves to not to expose the credentials in the public repo
const dotenv = require('dotenv');
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require the API functions, defined in the other files
const getExternalData = require('./getExternalData.js');


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
// defines the route which fetches the country information
app.post('/getGeolocation', geodataApi);

function geodataApi(req, res) {

    const endpointGeo = 'http://api.geonames.org/searchJSON'
    const queryGeo = `?q=${req.body.cityName}`;
    const country = `&country=${req.body.country}`;
    
    // For debugging reasons
    /* const queryGeo = '?q=london';
    const country = `&country=GB`; */
    const maxRowsGeo = '&maxRows=10';
    const usernameGeo = `&username=${process.env.USERNAMEGEO}`;

    const urlGeo = endpointGeo + queryGeo + country + maxRowsGeo + usernameGeo;
    console.log(urlGeo);

    getExternalData.getData(urlGeo, use='Geocoordinates')
        /* .then( (data) => data.json() ) */
        .then( (data) => {
            res.send(data);
            console.log({ status: 200, responseMessage: 'Connection established', responseBody: data });
        })
        .catch((err) => {
            console.log('Error connecting to server: ', err);
        });
}

// Debugging reasons
module.exports = { geodataApi }

// Defines the route which fetches the weather data
app.post('/currentWeather', getCurrentWeather);

function getCurrentWeather (req, res) {
    const endpoint = 'https://api.weatherbit.io/v2.0/current?';
    const lat = `&lat=${req.body.lat}`;
    const lon = `&lon=${req.body.lon}`;

    /* const lat = `&lat=51.50853`;
    const lon = `&lon=-0.12574`; */

    const apiKey = `&key=${process.env.WEATHERBITKEY}`
    
    const urlWeather = endpoint + lat + lon + apiKey;
    console.log(urlWeather);

    getExternalData.getData(urlWeather, use='Weatherbit')
        .then( (data) => {
            res.send(data);
            /* console.log(data); */
            console.log({ status: 200, responseMessage: 'Connection established', responseBody: data });
        })
        .catch((err) => {
            console.log('Error connecting to server: ', err);
        });

};

module.exports = { getCurrentWeather }


// Defines the route to fetch the forecasted data
app.post('/forecastWeather', getForecastWeather);

function getForecastWeather (req, res) {
    const endpoint = 'https://api.weatherbit.io/v2.0/current?';
    const lat = `&lat=${req.body.lat}`;
    const lon = `&lon=${req.body.lon}`;
    const days = '&days=14';

    /* const lat = `&lat=51.50853`;
    const lon = `&lon=-0.12574`; */

    const apiKey = `&key=${process.env.WEATHERBITKEY}`
    
    const urlWeather = endpoint + lat + lon + apiKey + days;
    console.log(urlWeather);

    getExternalData.getData(urlWeather, use='Weatherbit')
        .then( (data) => {
            res.send(data);
            /* console.log(data); */
            console.log({ status: 200, responseMessage: 'Connection established', responseBody: data });
        })
        .catch((err) => {
            console.log('Error connecting to server: ', err);
        });
};

module.exports = { getForecastWeather }

// Defines the route which fetches the city's image
app.post('/fetchImage', getCityImage);

function getCityImage (req, res) {
    const endpoint = 'https://pixabay.com/api/?';
    const cityName = `&q=${req.body.cityName}`
    const imageType = '&image_type=photo'
    const apiKey = `&key=${process.env.PIXABITKEY}`
    
    const urlImage = endpoint + cityName + imageType + apiKey;
    console.log(urlImage);

    getExternalData.getData(urlImage, use='Pixabay API')
        .then( (data) => {
            res.send(data);
            /* console.log(data); */
            console.log({ status: 200, responseMessage: 'Connection established', responseBody: data });
        })
        .catch((err) => {
            console.log('Error connecting to server: ', err);
        });

};

module.exports = { getCityImage }

// defines the GET route for the countries data
app.get('/countries', fetchCountries);

function fetchCountries (req, res) {
    res.send(countries);
};