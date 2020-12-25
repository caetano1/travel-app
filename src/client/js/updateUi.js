// Updates the UI
/* async function updateUI (data = {}) {
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
 */
const updateUI = (data = {}) => {
    const resultsNode = document.getElementById('results-holder');
    const imageHolder = document.createElement('DIV');
    imageHolder.classList.add('results-image-holder');
    imageHolder.id = 'results-image-holder';
    const cardsHolder = document.createElement('DIV');
    cardsHolder.classList.add('results-cards-holder');
    cardsHolder.id = 'results-cards-holder';

    resultsNode.appendChild(imageHolder);
    resultsNode.appendChild(cardsHolder);

    addImages(data.images, imageHolder);
    createWeatherCards(data.weather, cardsHolder);

}

const addImages = (arrayImages = [], parentNode) => {
    console.log('add images');
    console.log(arrayImages);
    console.log(parentNode)

    let fragment = document.createDocumentFragment()
    
    const imagesContainer = document.createElement('DIV');
    for (const img of arrayImages) {
        let imageHolder = document.createElement('DIV');
        imageHolder.classList.add('image');
        imageHolder.classList.add('hidden');

        let image = document.createElement('img');
        image.src = img.image;
        image.alt = `City image ${img.id}`;

        imageHolder.appendChild(image);
        imagesContainer.appendChild(imageHolder);
    }

    fragment.appendChild(imagesContainer);
    parentNode.appendChild(fragment);
}

const createWeatherCards = (arrayWeather = [], parentNode) => {
    console.log('create cards');
    console.log(arrayWeather);
    console.log(parentNode)

    let fragment = document.createDocumentFragment()
    for (const dailyWeather of arrayWeather) {
        let weatherCard = document.createElement('DIV');
        weatherCard.classList.add('weather-card');
        weatherCard.id = `weather-card-${dailyWeather.date}`;

        // add icon
        let weatherIcon = document.createElement('img');
        weatherIcon.classList.add('weather-icon');
        weatherIcon.src = `./media/${dailyWeather.iconCode}.png`;
        weatherIcon.alt = `Weather icon for day ${dailyWeather.date}`;

        // add date and weekday
        let dateHolder = document.createElement('DIV');
        dateHolder.classList.add('results-date-holder');

        let date = new Date(dailyWeather.date).getDay();
        let weekdayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        let weekday = weekdayName[date];

        let calendarDayHolder = document.createElement('DIV');
        calendarDayHolder.classList.add('calendar-day');
        calendarDayHolder.innerHTML = dailyWeather['date'].substr(5, dailyWeather['date'].length)
        let weekdayHolder = document.createElement('DIV');
        weekdayHolder.classList.add('weekday');
        weekdayHolder.innerHTML = weekday;

        dateHolder.appendChild(calendarDayHolder);
        dateHolder.appendChild(weekdayHolder);
        
        // add description
        let descriptionContainer = document.createElement('DIV');
        descriptionContainer.classList.add('weather-description');
        descriptionContainer.innerText = dailyWeather.description;
        
        // add temperature
        let temperatureContainer = document.createElement('DIV');
        temperatureContainer.classList.add('results-container');
        temperatureContainer.innerHTML = '<h4>Temperature</h4>';

            let temperatureHolder = document.createElement('DIV');
            temperatureHolder.classList.add('results-holder');
            temperatureHolder.classList.add('three-results');
            // add avg
            let avgTemperature = document.createElement('DIV');
            avgTemperature.classList.add('temperature');
            avgTemperature.classList.add('results-text');
            avgTemperature.innerText = `Avg: ${dailyWeather['temp'].toFixed(1)}º`
            // add max
            let maxTemperature = document.createElement('DIV');
            maxTemperature.classList.add('temperature');
            maxTemperature.classList.add('results-text');
            maxTemperature.innerText = `Max: ${dailyWeather['maxTemp'].toFixed(1)}º`
            // add min
            let minTemperature = document.createElement('DIV');
            minTemperature.classList.add('temperature');
            minTemperature.classList.add('results-text');
            minTemperature.innerText = `Min: ${dailyWeather['minTemp'].toFixed(1)}º`
        
            temperatureHolder.appendChild(avgTemperature);
            temperatureHolder.appendChild(maxTemperature);
            temperatureHolder.appendChild(minTemperature);

        temperatureContainer.appendChild(temperatureHolder);
        
        // add precipitation
        let precipitationContainer = document.createElement('DIV');
        precipitationContainer.classList.add('results-container');
        precipitationContainer.innerHTML = '<h4>Precipitation</h4>';

            let precipitationHolder = document.createElement('DIV');
            precipitationHolder.classList.add('results-holder');
            precipitationHolder.classList.add('two-results');
                // add probability
                let probability = document.createElement('DIV');
                probability.classList.add('probability-of-precipitation');
                probability.classList.add('results-text');
                probability.innerText = `Chance: ${dailyWeather.probabiltyOfPrecipitation}%`
                // add volume
                let volume = document.createElement('DIV');
                volume.classList.add('precipitation-volume');
                volume.classList.add('results-text');
                volume.innerText = `Vol: ${dailyWeather['precipitation'].toFixed(2)} mm`

            precipitationHolder.appendChild(probability);
            precipitationHolder.appendChild(volume);
        
        precipitationContainer.appendChild(precipitationHolder);
        
        // add snow
        let snowContainer = document.createElement('DIV');
        snowContainer.innerHTML = '<h4>Snow</h4>';
        snowContainer.classList.add('results-container');

            let snowHolder = document.createElement('DIV');
            snowHolder.classList.add('results-holder');
            snowHolder.classList.add('one-result');
                // add snow volume
                let snowVolume = document.createElement('DIV');
                snowVolume.classList.add('results-text');
                snowVolume.classList.add('snow');
                snowVolume.innerText = `Vol: ${dailyWeather.snow} mm`;
        
            snowHolder.appendChild(snowVolume);

        snowContainer.appendChild(snowHolder);

        // add wind
        let windContainer = document.createElement('DIV');
        windContainer.classList.add('results-container');
        windContainer.innerHTML = '<h4>Wind</h4>';
            let windHolder = document.createElement('DIV');
            windHolder.classList.add('results-holder');
            windHolder.classList.add('two-results');
                // add wind direction
                let direction = document.createElement('DIV');
                direction.classList.add('wind-direction');
                direction.classList.add('results-text');
                direction.innerText = `Dir: ${dailyWeather.windDirection}`
                // add wind speed
                let speed = document.createElement('DIV');
                speed.classList.add('wind-speed');
                speed.classList.add('results-text');
                speed.innerText = `Speed: ${dailyWeather["windSpeed"].toFixed(2)} m/s`

            windHolder.appendChild(direction);
            windHolder.appendChild(speed);
        
        windContainer.appendChild(windHolder);

        // Joins icon and dates in the same parent node
        let firstNode = document.createElement('DIV');
        firstNode.classList.add('icon-date');
        firstNode.appendChild(weatherIcon);
        firstNode.appendChild(dateHolder);

        // Joins description and other in 2 different nodes
        let secondNode = document.createElement('DIV');
        secondNode.appendChild(descriptionContainer);

        let thirdNode = document.createElement('DIV');
        thirdNode.classList.add('weather-details');
        thirdNode.appendChild(temperatureContainer);
        thirdNode.appendChild(precipitationContainer);
        thirdNode.appendChild(snowContainer);
        thirdNode.appendChild(windContainer);

        secondNode.appendChild(thirdNode);

        // appends everything to the card holder
        weatherCard.appendChild(firstNode);
        weatherCard.appendChild(secondNode);
        fragment.appendChild(weatherCard);
    }
    // create individual card
    parentNode.appendChild(fragment)
    
}



export { updateUI }