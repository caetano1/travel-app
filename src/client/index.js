// Entry point for Webpack

// Import functions
import { autocomplete } from './js/autocomplete'
import { getCountries, turnIntoArray } from './js/getCountries'
import { setCalendarPicker } from './js/pikadayCalendar'
import { checkEmptyField } from './js/fieldsValidation'
import { generateBtnHandler } from './js/app.js'
import { eraseLocalStorage, checkStoredInfo } from './js/localStorage.js'

// Import js files
import './js/app.js';

// Import styles
import './styles/style.scss';

// Import weather icons
import './media/a01d.png';
import './media/a01n.png';
import './media/a02d.png';
import './media/a02n.png';
import './media/a03d.png';
import './media/a03n.png';
import './media/a04d.png';
import './media/a04n.png';
import './media/a05d.png';
import './media/a05n.png';
import './media/a06d.png';
import './media/a06n.png';
import './media/c01d.png';
import './media/c01n.png';
import './media/c02d.png';
import './media/c02n.png';
import './media/c03d.png';
import './media/c03n.png';
import './media/c04d.png';
import './media/c04n.png';
import './media/d01d.png';
import './media/d01n.png';
import './media/d02d.png';
import './media/d02n.png';
import './media/d03d.png';
import './media/d03n.png';
import './media/f01d.png';
import './media/f01n.png';
import './media/r01d.png';
import './media/r01n.png';
import './media/r02d.png';
import './media/r02n.png';
import './media/r03d.png';
import './media/r03n.png';
import './media/r04d.png';
import './media/r04n.png';
import './media/r05d.png';
import './media/r05n.png';
import './media/r06d.png';
import './media/r06n.png';
import './media/s01d.png';
import './media/s01n.png';
import './media/s02d.png';
import './media/s02n.png';
import './media/s03d.png';
import './media/s03n.png';
import './media/s04d.png';
import './media/s04n.png';
import './media/s05d.png';
import './media/s05n.png';
import './media/s06d.png';
import './media/s06n.png';
import './media/t01d.png';
import './media/t01n.png';
import './media/t02d.png';
import './media/t02n.png';
import './media/t03d.png';
import './media/t03n.png';
import './media/t04d.png';
import './media/t04n.png';
import './media/t05d.png';
import './media/t05n.png';
import './media/u00d.png';
import './media/u00n.png';

/* import './media/341090384_IMG_3833.jpg';
import './media/342038688_IMG_3746.jpg';
import './media/IMG_5022.jpg'; */

// Builds the calendar components in the date-like inputs
const departureDate = document.getElementById('datepicker-departure');
const returnDate = document.getElementById('datepicker-return')
const today = new Date();

// Adds empty field validation to each input field
const inputs = document.getElementsByTagName('input');
for (const input of inputs) {
    input.addEventListener('input', (e) => {
        checkEmptyField(input);
    })
}

// Creates the calendar components
setCalendarPicker(departureDate, today);
setCalendarPicker(returnDate, today);

// Add the countries list to the country field
let countries = []
getCountries('http://localhost:3030/countries')
    .then( res => {
        countries = turnIntoArray(res);
        autocomplete(document.getElementById("input-countries"), countries);
    });

// Adds the event listener to the generate button
document.getElementById('generate').addEventListener('click', (e) => generateBtnHandler(countries));

// Adds the event listener to the erase button
document.getElementById('erase').addEventListener('click', eraseLocalStorage)

// Adds event listener to the window to see if there is any info
// stored in the local storage
window.addEventListener('load', checkStoredInfo)