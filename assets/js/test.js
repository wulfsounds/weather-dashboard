// Empty variable will be used to gather localStorage values;
let getLocation;
let apiKey = "1f56ef55a0f3d4c3bb739f2d664d73f9";
const searchBtn = document.getElementById("search-btn");

let coordinates;

// Empty weather variables;
let temp;
let wind;
let humidity;
let uvIndex;

// Set button to fire off localCity();
searchBtn.addEventListener("click", localCity);

// Pass getLocation through this function to obtain local storage value;
async function localCity(e) {
	e.preventDefault();
	if (window.localStorage) {
		getLocation = document.getElementById("get-city");

		localStorage.setItem("get-city", getLocation.value);
		getLocation.value = localStorage.getItem("get-city");
		getLocation = getLocation.value;
		// openAPI(); Run localStorage value through geocode then weather API
		weatherAPI();
		// geoGrab();
	}
}

// getLocation is set to city and returns coordinate data
async function geoGrab() {
	let city = getLocation;
	let geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

	// wait for fetch() to get the ok.
	await fetch(geoURL)
		.then(function (response) {
			// console.log(response.statusText);
			return response.json();
		})
		.then(function (data) {
			// console.log(data);
			coordinates = data;
			return coordinates;
		});
}

// Coordinate data is passed through the weather API and returns weather data
async function weatherAPI() {
	await geoGrab();
	console.log(coordinates);

	let [lat, lon] = [coordinates[0].lat, coordinates[0].lon];
	let queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imerprial&appid=${apiKey}`;

	await fetch(queryURL)
		.then(function (response) {
			console.log(response.statusText);
			return response.json();
		})
		.then(function (data) {
			console.log(data);
			console.log(Math.floor(data.current.temp));
			console.log(data.current.wind_speed);
			console.log(data.current.humidity); // concatinate with "%"
			console.log(data.daily[0].uvi);
		});
}

// Assign localStorage to city and fetch data from OpenWeather API;
// var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&current&units=imperial&appid=${apiKey}`;

// new API: https://api.openweathermap.org/data/2.5/onecall?...
