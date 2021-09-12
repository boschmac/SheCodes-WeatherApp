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
	today.innerHTML = ` ${currentDay}, ${currentMonth} ${currentDate} ${currentHour}:${currentMinutes} `;
}
function showTemperature(response) {
	let cityTemp = Math.round(response.data.main.temp);
	let currentTemp = document.querySelector("#weather-today");
	currentTemp.innerHTML = `${cityTemp}°C`;
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

function convertFarenheit(event) {
	event.preventDefault();
	let temp = 29;
	let currentTemp = Math.round((temp * 9) / 5 + 32);
	let farenheit = document.querySelector("#farenheit-button");
	let celcius = document.querySelector("#celcius-button");
	let weatherToday = document.querySelector("#weather-today");
	let weatherUnit = document.querySelector("#weather-unit");

	weatherToday.innerHTML = currentTemp;
	weatherUnit.innerHTML = "°F";
	farenheit.classList.add("button-select");
	celcius.classList.remove("button-select");
}

function convertCelcius(event) {
	event.preventDefault();
	let temp = 84;
	let currentTemp = Math.round(((temp - 32) * 5) / 9);
	let farenheit = document.querySelector("#farenheit-button");
	let celcius = document.querySelector("#celcius-button");
	let weatherToday = document.querySelector("#weather-today");
	let weatherUnit = document.querySelector("#weather-unit");

	weatherToday.innerHTML = currentTemp;
	weatherUnit.innerHTML = `°C`;
	farenheit.classList.remove("button-select");
	celcius.classList.add("button-select");
}

function showCurrent(response) {
	let currentCity = response.data.name;
	let currentCityDisplay = document.querySelector(".location");
	let currentLocTemp = document.querySelector("#weather-today");
	let temperature = Math.round(response.data.main.temp);
	currentLocTemp.innerHTML = `${temperature}°C`;
	currentCityDisplay.innerHTML = `${currentCity}`;
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

let farenheit = document.querySelector("#farenheit-button");
farenheit.addEventListener("click", convertFarenheit);

let celcius = document.querySelector("#celcius-button");
celcius.addEventListener("click", convertCelcius);

let currentCity = document.querySelector("#current-city");
currentCity.addEventListener("click", getCurrent);