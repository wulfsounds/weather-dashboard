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

function fiveDay() {
	console.log("fiveDay OK");
	console.log(weather);
	let i = 0;
	const weatherStats = [weather.daily.slice(1, 6)];
	// console.log(weatherStats);
	// let icon = weather.daily[i].weather[0].icon;
	// console.log(icon);

	weather.daily.slice(1, 6).forEach(function (weatherObject) {
		let icon = weather.daily[i].weather[0].icon;

		let dayBox = document.createElement("div");
		dayBox.setAttribute("class", "col-2 day-box");
		let forecast = document.createElement("div");
		forecast.setAttribute("class", "forecast");
		let dayDate = document.createElement("p");
		dayDate.setAttribute("class", "day-date");
		let dayIcon = document.createElement("img");
		dayIcon.setAttribute(
			`src`,
			`http://openweathermap.org/img/wn/${icon}@2x.png`
		);
		let dayTemp = document.createElement("p");
		dayTemp.setAttribute("class", "day-temp");
		let dayWind = document.createElement("p");
		dayWind.setAttribute("class", "day-wind");
		let dayHumid = document.createElement("p");
		dayHumid.setAttribute("class", "day-humid");
		let dayUVI = document.createElement("p");
		dayUVI.setAttribute("class", "day-uvi");
		let dayBadge = document.createElement("span");
		dayBadge.setAttribute("class", "day-badge");

		$(".five-day").append(dayBox);
		$(dayBox).append(forecast);
		$(forecast).append(dayDate);
		$(forecast).append(dayIcon);
		$(forecast).append(dayTemp);
		$(forecast).append(dayWind);
		$(forecast).append(dayHumid);
		$(forecast).append(dayUVI);
		$(dayUVI).append(dayBadge);
		$(dayTemp).text(`Temp: ${Math.floor(weather.daily[i].temp.day)}`);
		$(dayWind).text(`Wind: ${weather.daily[i].wind_speed} MPH`);
		$(dayHumid).text(`Humidity: ${weather.daily[i].humidity}%`);
		$(dayUVI).text(`UV Index: ${dayBadge}`);

		// Dates
		for (let j = 0; j < weatherStats.length - 1; j++) {
			$(dayDate).text(`${moment.add([j], "days").calendar()}`);
		}

		if (weather.daily[i].uvi <= 2) {
			console.log("green");
			$(dayBadge)
				.css("background-color", "green")
				.html(`${weather.daily[i].uvi}`);
			return (uviBadge = dayBadge);
		} else if (weather.daily[i].uvi >= 3 && weather.daily[i].uvi <= 5) {
			console.log("yellow");
			$(dayBadge)
				.css("background-color", "rgb(186, 186, 3)")
				.html(`${weather.daily[i].uvi}`);
			return (uviBadge = dayBadge);
		} else if (weather.daily[i].uvi >= 6 && weather.daily[i].uvi <= 7) {
			console.log("orange");
			$(dayBadge)
				.css("background-color", "orange")
				.html(`${weather.daily[i].uvi}`);
			return (uviBadge = dayBadge);
		} else if (weather.daily[i].uvi >= 8 && weather.daily[i].uvi <= 11) {
			console.log("red");
			$(dayBadge)
				.css("background-color", "red")
				.html(`${weather.daily[i].uvi}`);
			return (uviBadge = dayBadge);
		} else if (weather.daily[i].uvi >= 11) {
			console.log("purple");
			$(dayBadge)
				.css("background-color", "purple")
				.html(`${weather.daily[i].uvi}`);
			return (uviBadge = dayBadge);
		}

		i++;
	});
}
