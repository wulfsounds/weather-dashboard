// Empty variable will be used to gather localStorage values;
let getLocation;
const searchBtn = document.getElementById("search-btn");

// Empty weather variables;
let temp;
let wind;
let humidity;
let uvIndex;

// Set button to fire off localCity();
searchBtn.addEventListener("click", localCity);

// Pass getLocation through this function to obtain local storage value;
async function localCity (e) {
    e.preventDefault
    if (window.localStorage) {
        getLocation = document.getElementById("get-city");

        localStorage.setItem("get-city", getLocation.value);
        getLocation.value = localStorage.getItem("get-city");
        getLocation = getLocation.value;
        openAPI();
    }
}

// Assign localStorage to city and fetch data from OpenWeather API;
function openAPI() {
    let city = getLocation;
    let apiKey = '1f56ef55a0f3d4c3bb739f2d664d73f9'
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&current&units=imperial&appid=${apiKey}`;

    fetch(queryURL)
        .then(function (response) {
            console.log(response.statusText)
            return response.json();
    })
    .then(function (data) {
        console.log(data);
        console.log(data.name);
        console.log(Math.floor(data.main.temp));
        console.log(data.main.humidity);
        console.log(data.wind.speed);
        // console.log(data.current.uvi);


        temp = data.main.temp;
        wind = data.wind.speed;
        humidity = data.main.humidity;

        // let listTemp = document.createElement('li')
});
}
