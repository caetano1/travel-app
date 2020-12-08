/* Global Variables */
import { autocomplete } from './autocomplete'
import { fetchData } from './fetchData'
import { updateUI } from './updateUi'
import { getCountries } from './getCountries'
import { turnIntoArray } from './getCountries'
import { setCalendarPicker } from './pikadayCalendar'

// Create an object that will store the session information
let sessionData = {};

// Adds the event listener to the button
document.getElementById('generate').addEventListener('click', generateBtnHandler);

// Makes the request to fetch the weather data
function generateBtnHandler (e) {
    // Create a new date instance dynamically with JS
    const d = new Date();
    const country = document.getElementById('dropdownCountries').value;
    const cityName = document.getElementById('city').value;
    const strDepDate = document.getElementById('departureDate').value;
    const strRetDate = document.getElementById('returnDate').value;

    // Calculates the days until departure and stores it in the variable
    const departureDate = new Date(strDepDate);
    const daysUntilDeparture = (departureDate - d)/86400000;
    const returnDate = new Date(strRetDate);
    const tripDuration = (returnDate - departureDate)/86400000;

    sessionData.date = d;
    sessionData.country = country;
    sessionData.cityName = cityName;
    sessionData.departureDate = departureDate;
    sessionData.returnDate = returnDate;
    sessionData.daysUntilDeparture = daysUntilDeparture;    
    sessionData.tripDuration = tripDuration;

    console.log(sessionData)

    /* Fetches the data from the middleware */
    fetchData("http://localhost:3030/fetchData", sessionData)
        .then( (res) => {
            /* console.log(res); */
            updateUI(res);
        });

    /* document.getElementById('date').innerHTML = sessionData.departureDate; */
}


// Fetches the countries information an stores it in an array
document.addEventListener('DOMContentLoaded', callbackOnContentLoaded);

function callbackOnContentLoaded (e) {
    getCountries('http://localhost:3030/countries')
        .then( function(res) {
            const countries = turnIntoArray(res);
            autocomplete(document.getElementById("input-countries"), countries);
            setCalendarPicker(document.getElementById('datepicker-departure'));
            setCalendarPicker(document.getElementById('datepicker-return'));
        });
}