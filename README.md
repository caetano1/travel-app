# Travel App Project

This app aims to presents the user with the weather forecast and some pictures of their travel destination. The project relies on 3 external sources to work:

1. [Geonames](http://www.geonames.org/) - fetch destination geocoordinates.
2. [Weatherbit](https://www.weatherbit.io/api) - provide the weather forecast.
3. [Pixabay](https://pixabay.com/api/docs/) - provide the destination pictures.

This project is part of the Front End Web Developer Nanodegree, provided by [Udacity](https://www.udacity.com/).



## Installation and Set up

You'll need [Node.js](https://nodejs.org/), `^14.8.0`, and you'll also need to create your own API keys for the services mentioned above.

After cloning this project to your local machine, you can install its dependencies:

```
$ npm install
```

Add your own keys to the `.env-sample` file, and rename it to `.env`. This final file will contain only three lines, like below:

```
USERNAMEGEO = {{YOUR_KEY_GEO}}
WEATHERBITKEY = {{YOUR_KEY_WEATHER}}
PIXABAYKEY = {{YOUR_KEY_PIXABAY}}
```

Finally, open 2 terminals, run the following commands in the first one, to build the production environment and set up the server, running on `http://localhost:3030/`:

```
npm run build-prod
npm run start
```

And in the other, run the following to set up the dev environment, running on `http://localhost:3000/`:

```
npm run build-dev
```

The dev environment uses `webpack-dev-server`, which operates in a hot-loading state.


## Usage

Once set, the app will show the main view, containing:

* **Country destination**: start typing to expand country options, which can be selected using the keyboard or mouse.
* **City destination**: this field is free-form text. Beware to correctly match the city and the country, otherwise the results won't be as expected.
* **Date of departure**: a calendar to pick the day of departure will be shown right after clicking on the field.
* **Date of return**: as with the date of departure field, a calendar will be shown after clicking.
* **Generate button**: after filling in the form, clicking on this button will send the form information to the server, perform the requests to the external services, and update the UI to show the information.
* **Erase button**: this button allows the user to erase any search made previously.

After filling in the form and clicking on the Generate button, the UI will be update to show a carrousel with 5 images from the destination and cards presenting the weather forcast for each day of the interval between the departure date and the return date. These cards contains:

* An icon
* The date
* The weekday
* The weather description
* Temperature information - average, max and min
* Precipitation information - probability and volume
* Snow information - volume
* Wind information - direction and speed.

Once the first search is performed, the information is saved in the Local Storage, so the next time you open up the app again, the last searched info will be displayed. Clicking on **erase** resets the app again.

## List of Extend your Project/Ways to Stand Out sections included

* Allow the user to remove the trip.
* Use Local Storage to save the data so that when they close, then revisit the page, their information is still there.
* Instead of just pulling a single day forecast, pull the forecast for multiple days.
* Incorporate icons into forecast.
