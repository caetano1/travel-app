import { fetchData } from './fetchData'
import { updateUI } from './updateUi'
import { checkInputFields } from './fieldsValidation'

// Makes the request to fetch the weather data
const generateBtnHandler = (sessionData, countriesData) => {
    // inserted here to not incur in issues with async function
    const countryMaps = new Map(countriesData)
    
    if (checkInputFields()) {
        window.alert("Be sure to input the correct information before clicking on the button!");
        return
    }

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

            // Update UI using the server response
            updateUI(res);

            // Save response in local storage
            localStorage.setItem('sessionData', JSON.stringify(res));
        }); 
}

export { generateBtnHandler }