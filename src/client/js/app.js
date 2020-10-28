/* Global Variables */
// Create an object that will store the session information
let sessionData = {};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Adds the event listener to the button
document.getElementById('generate').addEventListener('click', generateBtnHandler);

// Makes the request to fetch the weather data
function generateBtnHandler (e) {
    const country = document.getElementById('dropdownCountries').value;
    const cityName = document.getElementById('city').value;
    const strDepDate = document.getElementById('departureDate').value;
    const strRetDate = document.getElementById('returnDate').value;

    // Calculates the days until departure and stores it in the variable
    const departureDate = new Date(strDepDate);
    const daysUntilDeparture = (departureDate - date)/86400000;

    const returnDate = new Date(strRetDate);
    const tripDuration = returnDate - departureDate;

    sessionData.country = country;
    sessionData.cityName = cityName;
    sessionData.departureDate = departureDate;
    sessionData.returnDate = returnDate;

    sessionData.daysUntilDeparture = daysUntilDeparture;    
    sessionData.tripDuration = tripDuration;

    /* Fetches the Geolocation coordinates */
    // Stores the interal server URL in a variable
    const uri = "http://localhost:3030/getGeolocation"

    fetchGeolocation(uri, sessionData)
        .then( (res) => {

            // Fetches the weather info
            console.log(res);
            /* getWeatherInfo() */;
        })
        .then( (res) => {

            // Fetches the city's image
            /* getImage() */;
        })
        .then( (res) => {

            // Updates the UI
            /* updateUI() */;
        });
    
    console.log(sessionData);
    window.alert('wait');

    document.getElementById('date').innerHTML = sessionData.departureDate;
    /* postData('/addEntry', {date: newDate, zipCode: zipCode, feelings: feelings, temp: dataRetrieved.main.temp}); */
}

// Sets the GET route to fetch the weather information from the middleware
const fetchGeolocation = async (url='', data={}) => {
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
    } catch(e) {
        console.log(res);
        window.alert(`An error has occured.`);
    }
};

const postData = async (url='', data={}) => {
    const res = await fetch (url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newEntry = await res.json();
        return newEntry;
    } catch (e) {
        console.log('Error :', e);
    }
};

const updateUI = async () => {
    const req = await fetch('/data');

    try{
        const allData = await req.json();
        console.log(allData);
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temp}`;
        document.getElementById('content').innerHTML = `Feelings: ${allData.feelings}`;
    } catch(e) {
        console.log('error', e);
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
