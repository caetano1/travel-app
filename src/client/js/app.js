/* Global Variables */
import { autocomplete } from './autocomplete'
import { fetchData } from './fetchData'
import { updateUI } from './updateUi'
import { getCountries, turnIntoArray } from './getCountries'
import { setCalendarPicker } from './pikadayCalendar'
import { checkInputFields, checkEmptyField } from './fieldsValidation'

// Create an object that will store the session information
let sessionData = {};

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
    console.log(countries);
    if (checkInputFields()) {
        window.alert("Be sure to input the correct information before clicking on the button!");
        return
    }

    console.log('milestone');

    // Create a new date instance dynamically with JS
    sessionData.date = new Date();
    sessionData.country = document.getElementById('input-countries').value;
    sessionData.cityName = document.getElementById('input-city').value;
    sessionData.departureDate = new Date(document.getElementById('datepicker-departure').value);
    sessionData.returnDate = new Date(document.getElementById('datepicker-return').value);

    // Calculates the days until departure and stores it in the variable
    const daysUntilDeparture = (sessionData.departureDate - sessionData.date)/86400000;
    const tripDuration = (sessionData.returnDate - sessionData.departureDate)/86400000;

    sessionData.daysUntilDeparture = daysUntilDeparture;    
    sessionData.tripDuration = tripDuration;

    console.log(sessionData)

    /* Fetches the data from the middleware */
    fetchData("http://localhost:3030/fetchData", sessionData)
        .then( (res) => {
            console.log(res);
            /* updateUI(res); */
        });

    /* document.getElementById('date').innerHTML = sessionData.departureDate; */
}