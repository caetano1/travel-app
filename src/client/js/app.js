/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Adds the event listener to the button
document.getElementById('generate').addEventListener('click', getTravelInfo);

// Dinamically changes the  UI with the information given and fetched from the API
function getTravelInfo (e) {
    const countryCode = document.getElementById('dropdownCountries').value;
    const cityName = document.getElementById('city').value;
    const departureDate = document.getElementById('departureDate').value;
    
    getData(uri)
        .then(function(dataRetrieved) {
            console.log(dataRetrieved);
            postData('/addEntry', {date: newDate, zipCode: zipCode, feelings: feelings, temp: dataRetrieved.main.temp});
        })
        .then(function(temp, newDate, feelings) {
            updateUI();
        });
}

// Sets the GET route to fetch the weather information from Open Weather Map
const getData = async (url='') => {
    const res = await fetch (url);

    if (res.status === 200) {
        const dataRetrieved = await res.json();
        return dataRetrieved;
    } else {
        console.log(res);
        const errorMessage =
        `An error has occured: ${res.statusText}.
        Please, check your country and ZIP code formats and try again.`;
        window.alert(errorMessage);
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

function callback(e) {
    getCountries('/countries')
        .then( function(countries) {
            buildMenu(countries);
        });
}

// Fetches the list
const getCountries = async (url='') => {
    const req = await fetch(url);

    try {
        const countries = await req.json();
        console.log(countries);
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
