/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Stores the API Key in a variable 
const apiKey = '781d27be53ccaae278c356ef46876e8a';

// Adds the event listener to the button
document.getElementById('generate').addEventListener('click', registerEntry);

/* function registerEntry () {
    console.log('test');
} */

// Dinamically changes the  UI with the information given and fetched from the API
function registerEntry (e) {
    /* const countryCode = document.getElementById('countryCode').innerHTML;  ,${countryCode}*/
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const uri = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;
    
    getData(uri)
        .then(function(dataRetrieved) {
            /* console.log(dataRetrieved); */
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
        window.alert(`An error occured: ${res.statusText}`);
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
			document.getElementById('date').innerHTML = allData.date;
			document.getElementById('temp').innerHTML = allData.temp;
			document.getElementById('content').innerHTML = allData.feelings;
		} catch(e) {
			console.log('error', e);
		}
}

// Builds the dropdown menu with the information from the server

// Fetches the list

// Builds the menu