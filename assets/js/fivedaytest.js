const weatherStats = [weather.daily.slice(1, 6)];
let icon = weatherStats[0].i.icon;

weatherStats.forEach(function (weatherObject) {
	const dayBox = document
		.createElement("div")
		.setAttribute("class", "col-2 day-box");
	const forecast = document
		.createElement("div")
		.setAttribute("class", "forecast");
	const dayDate = document
		.createElement("p")
		.setAttribute("class", "day-date");
	const dayIcon = document
		.createElement("img")
		.setAttribute(`src`, `http://openweathermap.org/img/wn/${icon}@2x.png`);
	const dayTemp = document
		.createElement("p")
		.setAttribute("class", "day-temp");
	const dayWind = document
		.createElement("p")
		.setAttribute("class", "day-wind");
	const dayHumid = document
		.createElement("p")
		.setAttribute("class", "day-humid");
	const dayUVI = document.createElement("p").setAttribute("class", "day-uvi");

	dayIcon.setAttribute("alt", "weather-icon");

	if (weatherStats[i].uvi <= 2) {
		$(dayUVI)
			.css("background-color", "green")
			.text(`${weatherStats[i].uvi}`);
	} else if (weatherStats[i].uvi >= 3 && weatherStats[i].uvi <= 5) {
		$(dayUVI)
			.css("background-color", "rgb(186, 186, 3)")
			.text(`${weatherStats[i].uvi}`);
	} else if (weatherStats[i].uvi >= 6 && weatherStats[i].uvi <= 7) {
		$(dayUVI)
			.css("background-color", "orange")
			.text(`${weatherStats[i].uvi}`);
	} else if (weatherStats[i].uvi >= 8 && weatherStats[i].uvi <= 11) {
		$(dayUVI).css("background-color", "red").text(`${weatherStats[i].uvi}`);
	} else if (weatherStats[i].uvi >= 11) {
		$(dayUVI)
			.css("background-color", "purple")
			.text(`${weatherStats[i].uvi}`);
	}

	$(dayTemp).text(`Temp: ${Math.floor(weatherObject.temp)}`);
	$(dayWind).text(`Wind: ${weatherObject.wind_speed} MPH`);
	$(dayHumid).text(`Humidity: ${weatherObject.current.humidity}%`);
	$(dayUVI).html(`UV Index: <span class="day-badge">${dayBadge}</span>`);

	// Dates
	for (let j = 0; j < weatherStats.length - 1; j++) {
		$(dayDate).text(`${moment.add([j], "days").calendar()}`);
	}

    $('.five-day').append(dayBox);
    $('dayBox').append(forecast);
    $(forecast).append(dayDate);
    $(forecast).append(dayIcon);
    $(forecast).append(dayTemp);
    $(forecast).append(dayWind);
    $(forecast).append(dayHumid);
    $(forecast).append(dayUVI);
});
