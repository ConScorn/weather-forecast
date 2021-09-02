// assign global variables /////////////////////////////////////////////////////
// apiKey
// HMTL IDS
// city
// temp
// wind
// humidty
// uv index - set class
// five day container
// cities history
let cities = [];
// functions //////////////////////////////////////////////////////////////////
// init
function init() {
    // check local storage for the key (cities) if present
    let citiesStorage = localStorage.getItem('cities');
    if (citiesStorage) {
        // loop through local storage and create buttons with the button label as the city
        cities = JSON.parse(citiesStorage);
        console.log(cities);
        cities.forEach(city => {
            // make and append a button to the left panel
        })
    }
    console.log('no data');
}
// getWeather
// parm: value of search box (city name)
// call the weather api with the city name to get the coordinates (lat, lon)
// find the lat and lon within the data and set them as varibles
// in the then of the call above, use the lat and lon to get curent weather and future
// in the then of the call above, i find the data i need for the top card on the right (city, date, temp, wind, humity, uv index)
// RENDER FUNCTION if uv index greater than some value, set the class
// RENDER FUNCTION for the 5 day forecast i want to loop through array of daily data and dynamically create a card and append it to the website
// each card will have date, icon for condition, temp, wind, humidty
// save to localstorage the city the user just searched,
// check loclastorage for that city, dont add if already there
// events ////////////////////////////////////////////////////////////////////
// init - check local storage
init();
// click search button - call the api and get our cream filling
// click on past city button (class) - just call the getWeather function with the label of the buton