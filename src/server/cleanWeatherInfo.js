/*
Function to clean the weather data up
It will select the:
 - Weather by each day:
   - Day
   - Weather description
   - Weather icon code
   - Average temperature
   - Min temperature
   - Max temperature
   - Probability of precipitation
   - Precipitation
   - Snow
   - Wind speed
   - Wind direction
*/ 

const cleanWeatherInfo = (originalData={}) => {
    let cleanedData = []
    
    let tempObj = {};
    for (const dataPerDay of originalData["data"]) {
        tempObj = {};
        tempObj["date"] = dataPerDay["valid_date"];
        tempObj["description"] = dataPerDay["weather"]["description"];
        tempObj["iconCode"] = dataPerDay["weather"]["icon"];
        tempObj["temp"] = dataPerDay["temp"];
        tempObj["maxTemp"] = dataPerDay["max_temp"];
        tempObj["minTemp"] = dataPerDay["min_temp"];
        tempObj["probabiltyOfPrecipitation"] = dataPerDay["pop"];
        tempObj["precipitation"] = dataPerDay["precip"];
        tempObj["snow"] = dataPerDay["snow"];
        tempObj["windDirection"] = dataPerDay["wind_cdir"];
        tempObj["windSpeed"] = dataPerDay["wind_spd"];
        cleanedData.push(tempObj);
    }

    return cleanedData;
}

module.exports = { cleanWeatherInfo };