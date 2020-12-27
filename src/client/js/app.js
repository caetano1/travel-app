/* Global Variables */
import { autocomplete } from './autocomplete'
import { fetchData } from './fetchData'
import { updateUI } from './updateUi'
import { getCountries, turnIntoArray } from './getCountries'
import { setCalendarPicker } from './pikadayCalendar'
import { checkInputFields, checkEmptyField } from './fieldsValidation'

// Create an object that will store the session information
let sessionData = {};
let jsonExample = {
    "country": "",
    "cityName": "",
    "weather": [
        {
          "date": "2020-12-24",
          "description": "Light rain",
          "iconCode": "r01d",
          "maxTemp": 26.1,
          "minTemp": 18.1,
          "precipitation": 6.25,
          "probabiltyOfPrecipitation": 70,
          "snow": 0,
          "temp": 22,
          "windDirection": "WSW",
          "windSpeed": 2.3470466
        },
        {
          "date": "2020-12-25",
          "description": "Moderate rain",
          "iconCode": "r02d",
          "maxTemp": 26.4,
          "minTemp": 18.9,
          "precipitation": 10.5625,
          "probabiltyOfPrecipitation": 80,
          "snow": 0,
          "temp": 22.2,
          "windDirection": "NE",
          "windSpeed": 2.9268045
        },
        {
          "date": "2020-12-25",
          "description": "Moderate rain",
          "iconCode": "r02d",
          "maxTemp": 26.4,
          "minTemp": 18.9,
          "precipitation": 10.5625,
          "probabiltyOfPrecipitation": 80,
          "snow": 0,
          "temp": 22.2,
          "windDirection": "NE",
          "windSpeed": 2.9268045
        },
        {
          "date": "2020-12-25",
          "description": "Moderate rain",
          "iconCode": "r02d",
          "maxTemp": 26.4,
          "minTemp": 18.9,
          "precipitation": 10.5625,
          "probabiltyOfPrecipitation": 80,
          "snow": 0,
          "temp": 22.2,
          "windDirection": "NE",
          "windSpeed": 2.9268045
        },
        {
          "date": "2020-12-25",
          "description": "Moderate rain",
          "iconCode": "r02d",
          "maxTemp": 26.4,
          "minTemp": 18.9,
          "precipitation": 10.5625,
          "probabiltyOfPrecipitation": 80,
          "snow": 0,
          "temp": 22.2,
          "windDirection": "NE",
          "windSpeed": 2.9268045
        }
    ],
    "images": [
        {
            "id": 1,
            "image": "./media/341090384_IMG_3833.jpg",
            "source": "https://pixabay.com/photos/backflip-parkour-parkouring-345027/"
        },
        {
            "id": 2,
            "image": "./media/342038688_IMG_3746.jpg",
            "source": "https://pixabay.com/photos/third-bridge-jk-brasilia-bridge-1127635/"
        },
        {
            "id": 3,
            "image": "./media/IMG_5022.jpg",
            "source": "https://pixabay.com/photos/bridge-brasilia-jk-brazil-sky-966164/"
        }
    ]
};

// Builds the calendar components in the date-like inputs, insert
// event listeners for validation in the inputs, builds the country
// list.

const departureDate = document.getElementById('datepicker-departure');
const returnDate = document.getElementById('datepicker-return')
const today = new Date();

// add empty field validation to each input field
const inputs = document.getElementsByTagName('input');
for (const input of inputs) {
    input.addEventListener('input', (e) => {
        // erases the previous message and error class, if any
        checkEmptyField(input);
    })
}

// Creates the calendar components
setCalendarPicker(departureDate, today);
setCalendarPicker(returnDate, today);

let countries = []
getCountries('http://localhost:3030/countries')
    .then( res => {
        countries = turnIntoArray(res);
        autocomplete(document.getElementById("input-countries"), countries);
    });

// Adds the event listener to the button
document.getElementById('generate').addEventListener('click', generateBtnHandler);

// Makes the request to fetch the weather data
function generateBtnHandler (e) {
    // inserted here to not incur in issues with async function
    const countryMaps = new Map(countries)
    
    /* location.hash = '#results'; */
    /* if (checkInputFields()) {
        window.alert("Be sure to input the correct information before clicking on the button!");
        return
    } */

    // Populates the sessionData object
    sessionData.date = new Date();
    sessionData.country = document.getElementById('input-countries').value;
    sessionData.countryAlpha2 = countryMaps.get(sessionData.country);
    sessionData.cityName = document.getElementById('input-city').value;
    sessionData.departureDate = new Date(document.getElementById('datepicker-departure').value);
    sessionData.returnDate = new Date(document.getElementById('datepicker-return').value);

    // Calculates the days until departure and stores it in the variable
    const daysUntilDeparture = (sessionData.departureDate - sessionData.date)/86400000;
    const tripDuration = (sessionData.returnDate - sessionData.departureDate)/86400000;

    sessionData.daysUntilDeparture = daysUntilDeparture;    
    sessionData.tripDuration = tripDuration;

    console.log(sessionData)

    /* updateUI(jsonExample); */

    /* Fetches the data from the middleware */
    fetchData("http://localhost:3030/fetchData", sessionData)
        .then( (res) => {
            console.log(res);
            updateUI(res);
        }); 
}