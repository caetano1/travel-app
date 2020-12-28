// This serves to not to expose the credentials in the public repo
const dotenv = require('dotenv');
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
let bodyData = {};

// Require the API functions, defined in the other files
const getExternalData = require('./getExternalData.js');
const { cleanWeatherInfo } = require('./cleanWeatherInfo.js');

// Require fs to read the JSON file containing the countries' list
const fs = require('fs');
let countriesData = fs.readFileSync('countries.json');
let countries = JSON.parse(countriesData);

/* Middleware*/
//Here we are configuring express to use express, body-parser and cors as middle-ware.
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { response } = require('express');

const app = express();
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
// defines the route to fetch the info needed from the external APIs
app.post('/fetchData', fetchData)

async function fetchData (req, res) {
    const cityNameUtf8 = encodeURIComponent(req.body.cityName);
    const country = req.body.countryAlpha2
    const daysUntilDeparture = req.body.daysUntilDeparture

    //
    // fetches the geocoordinates
    //
    const endpointGeo = 'http://api.geonames.org/searchJSON'
    const maxRowsGeo = 10;
    const usernameGeo = process.env.USERNAMEGEO;

    const urlGeo = `${endpointGeo}?q=${cityNameUtf8}&country=${country}&maxRows=${maxRowsGeo}&username=${usernameGeo}`;
    console.log(urlGeo);

    let responseBodyGeocoordinates = await getExternalData.getData(urlGeo, use='Geocoordinates');
    /* console.log(responseBody); */
    
    const geoCoords = { 'lat': responseBodyGeocoordinates.geonames[0].lat, 'lon': responseBodyGeocoordinates.geonames[0].lng }

    /* console.log(geoCoords); */

    //
    // fetches the city image
    //
    const endpointPixabay = 'https://pixabay.com/api/?';
    const imageType = 'photo';
    const pixabayKey = process.env.PIXABAYKEY;
        /* const cityName = `&q=new york` */
    const urlImage = `${endpointPixabay}&q=${cityNameUtf8}&image_type=${imageType}&key=${pixabayKey}`;
    console.log(urlImage);

    let responseBodyImages = await getExternalData.getData(urlImage, use='Pixabay API');
    const images = [
        {
            "id": 1,
            "image": responseBodyImages.hits[0].webformatURL,
            "source": responseBodyImages.hits[0].pageURL
        },
        {
            "id": 2,
            "image": responseBodyImages.hits[1].webformatURL,
            "source": responseBodyImages.hits[1].pageURL
        },
        {
            "id": 3,
            "image": responseBodyImages.hits[2].webformatURL,
            "source": responseBodyImages.hits[2].pageURL
        }
    ];
    /* console.log(images); */
    
    //
    // fetches the weather data
    //
    const tripDuration = req.body.tripDuration;

    const daysUntilReturn = daysUntilDeparture + tripDuration
    let days = '';
    if (daysUntilReturn >= 16.0) {
        days = '&days=16';
    } else {
        days = `&days=${daysUntilReturn}`;
    }
    const endpointWeather = `https://api.weatherbit.io/v2.0/forecast/daily?${days}`;
        /* const lat = `&lat=51.50853`;
        const lon = `&lon=-0.12574`;
        const urlWeather = `${endpoint}?&lat=${lat}&lon=${lon}&key=${weatherbitKey}` */
    const weatherbitKey = process.env.WEATHERBITKEY;
    const urlWeather = `${endpointWeather}&lat=${geoCoords.lat}&lon=${geoCoords.lon}&key=${weatherbitKey}`;
    console.log(urlWeather);

    const responseBodyWeather = await getExternalData.getData(urlWeather, use='Weatherbit')
    
    // if (responseBodyWeather.Error) {
        const responseBodyWeatherLean = cleanWeatherInfo(responseBodyWeather);
    // }
    
    // builds the API response body
    let responseBody = {}

    responseBody.country = country;
    responseBody.cityName = req.body.cityName;
    responseBody.weather = responseBodyWeatherLean;
    responseBody.images = images;

    console.log(responseBody);

    res.send(responseBody);
}

// defines the GET route for the countries data
app.get('/countries', fetchCountries);

function fetchCountries (req, res) {
    res.send(countries);
};

// defines a GET route for testing matters
app.get('/test', test);

function test (req, res) {
    res.send( { statusCode: 200, message: 'Success.' } );
}

module.exports = server