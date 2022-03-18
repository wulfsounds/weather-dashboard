// Empty variable will be used to gather localStorage values;
let getLocation;
let apiKey = "1f56ef55a0f3d4c3bb739f2d664d73f9";
const searchBtn = document.getElementById("search-btn");
let coordinates;
let weather;

// Empty weather variables;
let temp;
let wind;
let humidity;
let uvStats;
let uviBadge;

//Create Five Day Forecast
const dayBox = document
	.createElement("div")
	.setAttribute("class", "col-2 day-box");

// Setting the clock to exist beneath city name
let currentDate = moment().format("L");
$(".current-date").text(`(${currentDate})`);

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
		// openAPI(); Run localStorage value through geocode then weather API;
		weatherAPI();
		// geoGrab();
	}
}

// getLocation is set to city and returns coordinate data;
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

// Coordinate data is passed through the weather API and returns weather data;
async function weatherAPI() {
	await geoGrab();
	console.log(coordinates);

	// Assigns coordinates to lat/lon and passes through API;
	let [lat, lon] = [coordinates[0].lat, coordinates[0].lon];
	let queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

	await fetch(queryURL)
		.then(function (response) {
			console.log(response.statusText);
			return response.json();
		})
		.then(function (data) {
			console.log(data);

			// console.log(Math.floor(data.current.temp));
			// console.log(data.current.wind_speed);
			// console.log(data.current.humidity); // concatinate with "%"
			// console.log(data.daily[0].uvi);
			weather = data;
			return weather;
		});
	dashboard();
	fiveDay();
}

function dashboard() {
	console.log(weather);
	// Build Header with City Name, todays date, and weather icon
	console.log(weather);
	// Weather Icon
	let icon = weather.current.weather[0].icon;
	let img = document.createElement("img");
	img.setAttribute(`src`, `http://openweathermap.org/img/wn/${icon}@2x.png`);
	img.setAttribute("alt", "weather-icon");
	// Header
	$(".city-name").text(`${getLocation.toLowerCase()}.`);
	$(".h2-contain").append(img);

	// Populate top display with temp, wind, humidity, and UV
	// Temp
	$(".temp").text(`Temp: ${Math.floor(weather.current.temp)}`);
	// Wind
	$(".wind").text(`Wind: ${weather.current.wind_speed} MPH`);
	// Humidity
	$(".humid").text(`Humidity: ${weather.current.humidity}%`);
	if (weather.daily[0].uvi <= 2) {
		$(".badge")
			.css("background-color", "green")
			.text(`${weather.daily[0].uvi}`);
	} else if (weather.daily[0].uvi >= 3 && weather.daily[0].uvi <= 5) {
		$(".badge")
			.css("background-color", "rgb(186, 186, 3)")
			.text(`${weather.daily[0].uvi}`);
	} else if (weather.daily[0].uvi >= 6 && weather.daily[0].uvi <= 7) {
		$(".badge")
			.css("background-color", "orange")
			.text(`${weather.daily[0].uvi}`);
	} else if (weather.daily[0].uvi >= 8 && weather.daily[0].uvi <= 10) {
		$(".badge")
			.css("background-color", "red")
			.text(`${weather.daily[0].uvi}`);
	} else if (weather.daily[0].uvi >= 11) {
		$(".badge")
			.css("background-color", "purple")
			.text(`${weather.daily[0].uvi}`);
	}
}