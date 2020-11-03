/* Global Variables */
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

// Sets the function to fetch the information from the middleware
const fetchData = async (url='', data={}) => {
    const res = await fetch (url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const dataRetrieved = await res.json();
        return dataRetrieved;
    } catch(err) {
        console.log(err);
        window.alert(`An error has occured.`);
    }
};

const updateUI = async (data = {}) => {
    const req = await fetch('/data');

    try{
        const allData = await req.json();
        console.log(allData);
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temp}`;
        document.getElementById('content').innerHTML = `Feelings: ${allData.feelings}`;
    } catch(err) {
        console.log('error', err);
    }
}

// Builds the dropdown menu with the information from the server
document.addEventListener('DOMContentLoaded', callback);

function callback (e) {
    getCountries('http://localhost:3030/countries')
        .then( function(countries) {
            buildMenu(countries);
        });
}

// Fetches the list
const getCountries = async (url='') => {
    const req = await fetch(url);

    try {
        const countries = await req.json();
        return countries;
    } catch (e) {
        console.log(e)
    }
}

// Builds the menu
function buildMenu (data={}) {
    const dropdownMenu = document.getElementById('dropdownCountries');
    const fragment = document.createDocumentFragment();

    for (const element of data) {
        const option = document.createElement('option');
        option.className = 'country';
        option.id = element['alpha-2'].toLowerCase();
        option.value = element['alpha-2'].toLowerCase();
        option.innerHTML = element.name;
        fragment.appendChild(option);
    }
    dropdownMenu.appendChild(fragment);
}
