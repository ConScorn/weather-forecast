// HTML ID'S
let cityName = document.getElementById('cityName');
let date = document.getElementById('date')
let temp = document.getElementById('temp');
let wind = document.getElementById('wind');
let humidity = document.getElementById('humidity');
let uvContainer = document.getElementById('uvContainer');
let uv = document.getElementById('uv');
let iconContainer = document.getElementById('iconContainer');
let cityInput = document.getElementById('cityInput');
let searchBtn = document.getElementById('searchBtn');
let fiveDayContainer = document.getElementById('fiveDayContainer');
let pastSearches = document.getElementById('city');
const OneCallApiKey = "b182c388e8e8d507a2f36ed916e73829";
const cWApiKey = "4e5ba1d148f321e975a3ab4ac38b8ed5"
const sixteenDayApiKey = "586b522e8601ad92b26704e049e1a65d";
let cities = [];

// API call https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// API call (16 Day Forecast): http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}
// API call (Current Weather): http://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// functions //////////////////////////////////////////////////////////////////
// This function will initialize the page upon loading
function init() {
    // check local storage for the key (cities) if present
    let citiesStorage = localStorage.getItem('cities');
    if (citiesStorage) {
        // loop through local storage and create buttons with the button label as the city
        cities = JSON.parse(citiesStorage);
        console.log(cities);
        cities.forEach(city => {
            // make and append a button to the left panel
            let pastButton = document.createElement("button");
            pastButton.innerHTML = city;
            pastSearches.appendChild(pastButton);
        })
    }
    console.log('no data');
}

function convertToFahrenheit(temp) {
    return (Math.round(((temp - 273.15)*1.8)+32));

}

function getWeather(citySearch) {
    citySearch = cityInput.value;
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${cWApiKey}`)
        .then(response => response.json())
        .then(data => {
            let cityValue = data['name'];
            let dateValue = new Date(data.dt * 1000);
            let tempValue = data['main']['temp'];
            let descValue = data['weather'][0]['description'];
            let windValue = data['wind']['speed'];
            let humidityValue = data['main']['humidity'];
            let iconValue = data['weather'][0]['icon'];

            cityName.innerHTML = cityValue;
            date.innerHTML = dateValue.toLocaleDateString();
            temp.innerHTML = `Temp: ${convertToFahrenheit(tempValue)} F`;
            wind.innerHTML = `Wind: ${windValue} MPH`;
            humidity.innerHTML = `Humidity: ${humidityValue}`;
            iconContainer.innerHTML = `<img id="icon" src="http://openweathermap.org/img/w/${iconValue}.png" />`;
        })

     .catch(err => alert("Not a City!"))

}
// param: value of search box (city name)
// call the weather api with the city name to get the coordinates (lat, lon)
// find the lat and lon within the data and set them as varibles
// in the then of the call above, use the lat and lon to get curent weather and future
// in the then of the call above, i find the data i need for the top card on the right (city, date, temp, wind, humidity, uv index)
// RENDER FUNCTION if uv index greater than some value, set the class
// RENDER FUNCTION for the 5 day forecast i want to loop through array of daily data and dynamically create a card and append it to the website
// each card will have date, icon for condition, temp, wind, humidty
// save to localstorage the city the user just searched,
// check localstorage for that city, dont add if already there

// events ////////////////////////////////////////////////////////////////////
// init - check local storage
init();
// click search button - call the api and get our cream filling
searchBtn.addEventListener('click', getWeather);
// click on past city button (class) - just call the getWeather function with the label of the button