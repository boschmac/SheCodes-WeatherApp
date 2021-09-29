function formatDate(date) {
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	let currentDay = days[date.getDay()];
	let currentMonth = months[date.getMonth()];
	let currentDate = date.getDate();
	let currentHour = date.getHours();
	let currentMinutes = date.getMinutes();

	let today = document.querySelector("#current-date");

	if (currentMinutes < 10) {
		currentMinutes = `0${currentMinutes}`;
	}
	today.innerHTML = ` ${currentDay}, ${currentMonth} ${currentDate} ${currentHour}:${currentMinutes} `;
}
function showTemperature(response) {
	let currentTemp = document.querySelector("#weather-today");
	let weatherDescription = document.querySelector("#weather-description");
	let weatherIcon = document.querySelector("#weather-icon");
	let wind = document.querySelector("#wind-speed");
	let humidity = document.querySelector("#humidity");

	celciusTemperature = Math.round(response.data.main.temp);

	currentTemp.innerHTML = `${celciusTemperature}°C`;
	weatherDescription.innerHTML = response.data.weather[0].description;
	weatherIcon.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	weatherIcon.setAttribute("alt", response.data.weather[0].description);
	wind.innerHTML = Math.round(response.data.wind.speed);
	humidity.innerHTML = `${response.data.main.humidity}%`;
}

function clickSearch(event) {
	event.preventDefault();
	let city = document.querySelector("#city-input");
	let cityText = document.querySelector(".location");
	cityText.innerHTML = `${city.value}`;
	let apiKey = "3b500a0fcd4ea4cff00793465f95a169";
	let unit = "metric";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${unit}`;
	axios.get(apiUrl).then(showTemperature);
}

function showCurrent(response) {
	let currentCity = response.data.name;
	let currentCityDisplay = document.querySelector(".location");
	let currentLocTemp = document.querySelector("#weather-today");
	let temperature = Math.round(response.data.main.temp);
	let wind = document.querySelector("#wind-speed");
	let humidity = document.querySelector("#humidity");
	let weatherIcon = document.querySelector("#weather-icon");

	currentLocTemp.innerHTML = `${temperature}°C`;
	currentCityDisplay.innerHTML = `${currentCity}`;
	weatherIcon.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	weatherIcon.setAttribute("alt", response.data.weather[0].description);
	wind.innerHTML = Math.round(response.data.wind.speed);
	humidity.innerHTML = `${response.data.main.humidity}%`;
}

function showPosition(position) {
	let longitude = position.coords.longitude;
	let latitude = position.coords.latitude;
	let apiKey = "3b500a0fcd4ea4cff00793465f95a169";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
	console.log(apiUrl);
	axios.get(apiUrl).then(showCurrent);
}

function getCurrent() {
	navigator.geolocation.getCurrentPosition(showPosition);
}

let currentTime = new Date();
formatDate(currentTime);

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", clickSearch);

let currentCity = document.querySelector("#current-city");
currentCity.addEventListener("click", getCurrent);
