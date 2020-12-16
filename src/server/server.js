// This serves to not to expose the credentials in the public repo
const dotenv = require('dotenv');
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
bodyData = {};

// Require the API functions, defined in the other files
const getExternalData = require('./getExternalData.js');

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
    /* console.log(req.body); */

    const cityNameUtf8 = encodeURIComponent(req.body.cityName);
    const countryUtf8 = encodeURIComponent(req.body.country);
    const daysUntilDeparture = req.body.daysUntilDeparture

    // fetches the geocoordinates
    const endpointGeo = 'http://api.geonames.org/searchJSON'
    const maxRowsGeo = 10;
    const usernameGeo = process.env.USERNAMEGEO;

    const urlGeo = `${endpointGeo}?q=${cityNameUtf8}&country=${countryUtf8}&maxRows=${maxRowsGeo}&username=${usernameGeo}`;
    console.log(urlGeo);

    let responseBody = await getExternalData.getData(urlGeo, use='Geocoordinates');
    console.log(responseBody);
    const geoCoords = { 'lat': responseBody.geonames[0].lat, 'lon': responseBody.geonames[0].lng }

    console.log(geoCoords);

    // fetches the city image
    const endpointPixabay = 'https://pixabay.com/api/?';
    const imageType = 'photo';
    const pixabayKey = process.env.PIXABAYKEY;
        /* const cityName = `&q=new york` */
    const urlImage = `${endpointPixabay}&q=${cityName}&image_type=${imageType}&key=${pixabayKey}`;
    /* console.log(urlImage); */

    let imagesResponse = await getExternalData.getData(urlImage, use='Pixabay API');
    const images = [
        {
            id: 1,
            image: imagesResponse.hits[0].webformatURL,
            source: imagesResponse.hits[0].pageURL
        },
        {
            id: 2,
            image: imagesResponse.hits[1].webformatURL,
            source: imagesResponse.hits[1].pageURL
        },
        {
            id: 3,
            image: imagesResponse.hits[2].webformatURL,
            source: imagesResponse.hits[2].pageURL
        }
    ];
    console.log(images);

    // fetches the weather data
    let endpointWeather = '';
    if (daysUntilDeparture < 7.0) {
        endpointWeather = 'https://api.weatherbit.io/v2.0/current?';    
    } else {
        const days = '&days=14'
        endpointWeather = `https://api.weatherbit.io/v2.0/forecast/daily?${days}`;
    }
        /* const lat = `&lat=51.50853`;
        const lon = `&lon=-0.12574`;
        const urlWeather = `${endpoint}?&lat=${lat}&lon=${lon}&key=${weatherbitKey}` */
    const weatherbitKey = process.env.WEATHERBITKEY;
    const urlWeather = `${endpointWeather}&lat=${geoCoords.lat}&lon=${geoCoords.lon}&key=${weatherbitKey}`;
    /* console.log(urlWeather); */

    const weatherData = await getExternalData.getData(urlWeather, use='Weatherbit')

    // returns bodyData
    bodyData.date = req.body.date;
    bodyData.departureDate = req.body.departureDate;
    bodyData.returnDate = req.body.returnDate;
    bodyData.departureDate = req.body.departureDate;
    bodyData.country = country;
    bodyData.cityName = cityName;
    bodyData.geoCoords = geoCoords;
    bodyData.images = images;
    bodyData.weather = weatherData;

    console.log(bodyData);

    res.send(bodyData);
}

// defines the GET route for the countries data
app.get('/countries', fetchCountries);

function fetchCountries (req, res) {
    res.send(countries);
};