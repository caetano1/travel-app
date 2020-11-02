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

    sessionData.country = country;
    sessionData.cityName = cityName;
    sessionData.departureDate = departureDate;
    sessionData.returnDate = returnDate;
    sessionData.daysUntilDeparture = daysUntilDeparture;    
    sessionData.tripDuration = tripDuration;

    /* Fetches the Geolocation coordinates */
    fetchGeolocation("http://localhost:3030/getGeolocation", sessionData)
        .then( (res) => {
            if (res.geonames.length == 0) {
                window.alert("City not found - Please, try again!");
                return;
            };
            console.log('passed geonames');

            // Stores the lat and lng in variables
            const lat = res.geonames[0].lat;
            const lon = res.geonames[0].lng;
            const geoCoord = { 'lat': lat, 'lon': lon }

            sessionData.geoCoord = geoCoord;
            console.log(sessionData);

            // Fetches the city's image
            fetchImage("http://localhost:3030/fetchImage", { city: cityName })
                .then( (res) => {

                    console.log('passed fetch images');

                    let images = [
                        {
                            id: 1,
                            image: res.hits[0].webformatURL,
                            source: res.hits[0].pageURL
                        },
                        {
                            id: 2,
                            image: res.hits[1].webformatURL,
                            source: res.hits[1].pageURL
                        },
                        {
                            id: 3,
                            image: res.hits[2].webformatURL,
                            source: res.hits[2].pageURL
                        }
                    ]

                    sessionData.images = images
                    console.log(sessionData);

                     // Checks the departure proximity and fetches the weather info
                    console.log(daysUntilDeparture)
                    if (daysUntilDeparture < 7.0) {
                        getWeatherInfo("http://localhost:3030/currentWeather", geoCoord)
                            .then( (res) => {
                                console.log('passed current weather info');
                                console.log(res.data);
                            })
                    } else {
                        getWeatherInfo("http://localhost:3030/forecastWeather", geoCoord)
                            .then( (res) => {
                                console.log('passed forecast weather info');
                                console.log(res.data);
                            })
                    }
                    
                    /* updateUi(sessionData); */
                })
        })
    
    console.log("end", sessionData);

    document.getElementById('date').innerHTML = sessionData.departureDate;
    /* postData('/addEntry', {date: newDate, zipCode: zipCode, feelings: feelings, temp: dataRetrieved.main.temp}); */
}

// Sets the function to fetch the geocoords information from the middleware
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
    } catch(err) {
        console.log(err);
        window.alert(`An error has occured.`);
    }
};

// Sets the function to fetch the current weather information from the middleware
const getWeatherInfo = async (url='', data={}) => {
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

// Sets the function to fetch the current weather information from the middleware
const fetchImage = async (url='', data={}) => {
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
