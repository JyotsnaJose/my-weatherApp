//for search button and default weather display
feather.replace();
fetchWeather("Minnesota");

function formatDate(currentDate) {
  let day = now.getDay();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let month = now.getMonth();
  let date = now.getDate();
  let year = now.getFullYear();

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${months[month]} ${date} ${year}, ${days[day]}, ${hour}:${minutes} CST`;
}

function searchCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-city");
  let cityDisplay = document.querySelector("#cityDisplay");

  if (cityName.value != "") {
    let city = cityName.value.trim();
    cityDisplay.innerHTML = city;
    fetchWeather(cityDisplay.innerHTML);
  } else {
    cityDisplay.innerHTML = "Minnesota";
    fetchWeather(cityDisplay.innerHTML);
  }
}

function fetchWeather(city) {
  console.log(city);
  apiKey = "77284b6440cc462afb48cef654bc731c";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  document.querySelector("#cityDisplay").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#high-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
}

function celsiusToFahrenheit(event) {
  event.preventDefault();
  let currentTempValue = document.querySelector("#current-temp");
  let temperature = currentTempValue.innerHTML;
  let fahrenheitValue = Math.round(temperature * (9 / 5) + 32);
  currentTempValue.innerHTML = fahrenheitValue;

  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = Math.round(feelsLike.innerHTML * (9 / 5) + 32);

  let highTemp = document.querySelector("#high-temp");
  highTemp.innerHTML = Math.round(highTemp.innerHTML * (9 / 5) + 32);

  let lowTemp = document.querySelector("#low-temp");
  lowTemp.innerHTML = Math.round(lowTemp.innerHTML * (9 / 5) + 32);
}

function FahrenheitToCelsius(event) {
  event.preventDefault();
  let currentTempValue = document.querySelector("#current-temp");
  let temperature = currentTempValue.innerHTML;
  let celsiusValue = Math.round((temperature - 32) * (5 / 9));
  currentTempValue.innerHTML = celsiusValue;

  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = Math.round((feelsLike.innerHTML - 32) * (5 / 9));

  let highTemp = document.querySelector("#high-temp");
  highTemp.innerHTML = Math.round((highTemp.innerHTML - 32) * (5 / 9));

  let lowTemp = document.querySelector("#low-temp");
  lowTemp.innerHTML = Math.round((lowTemp.innerHTML - 32) * (5 / 9));
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

function getLocation(response) {
  let latitude = response.coords.latitude;
  let longitude = response.coords.longitude;
  let apiKey = "77284b6440cc462afb48cef654bc731c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentLocation);
}

function displayCurrentLocation(position) {
  console.log(position);
  let cityDisplay = document.querySelector("#cityDisplay");
  cityDisplay.innerHTML = position.data.name;
  fetchWeather(position.data.name);
}

//Current Date and time
let dateDisplay = document.querySelector("#dateTime");
let now = new Date();
dateDisplay.innerHTML = formatDate(now);

//Search city
let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", searchCity);

//Celsius-Fahrenheit conversion
let fahrenheitClick = document.querySelector("#to-fahrenheit");
fahrenheitClick.addEventListener("click", celsiusToFahrenheit);

let celsiusClick = document.querySelector("#to-celsius");
celsiusClick.addEventListener("click", FahrenheitToCelsius);

//current location
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);
