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
let pastSearches = document.getElementById('pastSearches');
let pastButton = document.querySelectorAll('#m12')
const OneCallApiKey = "b182c388e8e8d507a2f36ed916e73829";
const cWApiKey = "4e5ba1d148f321e975a3ab4ac38b8ed5"
const stDayApiKey = "927d09bc49dbee6aac7f5cb1df707542";
let cities = [];

// API call https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// API call (Current Weather): https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// API call (16 Day Forecast): https://api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}

// functions //////////////////////////////////////////////////////////////////
// This function will initialize the page upon loading
function init() {
    createButtons();
}

function convertToFahrenheit(temp) {
    return (Math.round(((temp - 273.15)*1.8)+32));

}

function convertUnix(date) {
    let unixStamp = new Date(date * 1000);
    return unixStamp.toLocaleDateString();
}

function getWeather(citySearch) {
    citySearch = cityInput.value;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${cWApiKey}`)
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
            iconContainer.innerHTML = `<img id="icon" alt="Weather Icon" src="https://openweathermap.org/img/w/${iconValue}.png" />`;
        })

     .catch(err => alert("Not a City!"))
    getForecast();
    saveCity(cityInput.value);
}

function getForecast() {
    fiveDayContainer.innerHTML = "";
    let cnt = 6;
    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityInput.value}&cnt=${cnt}&appid=${stDayApiKey}`)
        .then(response => response.json())
        .then(data => {
            for (i = 1; i <= 5; i++) {
                let dateValue = convertUnix(data['list'][i]['dt']);
                let iconValue = `https://openweathermap.org/img/w/${data['list'][i]['weather'][0]['icon']}.png`; 
                let tempValue = convertToFahrenheit(data['list'][i]['temp']['day']);
                let windValue = `${data['list'][i]['speed']} MPH`;
                let humidityValue = data['list'][i]['humidity'];

                let forecastDay = document.createElement('div');
                let forecastDate = document.createElement('h8');
                let forecastIcon = document.createElement('img');
                let forecastTemp = document.createElement('h8');
                let forecastWind = document.createElement('h8');
                let forecastHumidity = document.createElement('h8');
                fiveDayContainer.append(forecastDay);
                forecastDay.setAttribute('class', 'col-md-2');
                forecastDate.setAttribute('class', 'btn-block');
                forecastTemp.setAttribute('class', 'btn-block');
                forecastWind.setAttribute('class', 'btn-block');
                forecastHumidity.setAttribute('class', 'btn-block');
                forecastDate.setAttribute('id', 'cWhite');
                forecastTemp.setAttribute('id', 'cWhite');
                forecastWind.setAttribute('id', 'cWhite');
                forecastHumidity.setAttribute('id', 'cWhite');
                forecastDay.setAttribute('id', 'forecastCard');
                forecastIcon.setAttribute('src', iconValue);
                forecastDate.innerHTML = dateValue;
                forecastTemp.innerHTML = `Temp: ${tempValue}`;
                forecastWind.innerHTML = `Wind: ${windValue}`;
                forecastHumidity.innerHTML = `Humidity: ${humidityValue}`;
                forecastDay.append(forecastDate);
                forecastDay.append(forecastIcon);
                forecastDay.append(forecastTemp);
                forecastDay.append(forecastWind);
                forecastDay.append(forecastHumidity);
            }
        })
}

function saveCity(citySearch) {
    if (cities.includes(citySearch)) {
        
    } else {
        cities.push(citySearch);
    }
    localStorage.setItem('cities', JSON.stringify(cities));
    createButtons();
}

function createButtons() {
    pastSearches.innerHTML = "";
    let citiesStorage = localStorage.getItem('cities');
    if (citiesStorage != null) {
        cities = JSON.parse(citiesStorage);
        console.log(cities);
        cities.forEach(city => {
            let pastButton = document.createElement("button");
            pastSearches.appendChild(pastButton);
            pastButton.setAttribute('class', 'btn-block');
            pastButton.setAttribute('id', 'm12');
            pastButton.innerHTML = city;
        })
    } else {
        return "";
    }
    
}

// events ////////////////////////////////////////////////////////////////////
// click search button - call the api and get our cream filling
searchBtn.addEventListener('click', getWeather);
// click on past city button (class) - just call the getWeather function with the label of the button
// pastSearches.addEventListener('click', function () {

// });

init();