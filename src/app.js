let apiKey = "0d6e6a447f07653a71842ab1529ot22b";

function updateTime() {
  let now = new Date();
  let hour = (now.getHours() < 10 ? "0" : "") + now.getHours();
  let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
  let weekday = days[now.getDay()];
  let day = now.getDate();
  let month = now.getMonth() + 1;
  let month2digit = (month < 10 ? "0" : "") + month;
  let year = now.getFullYear();
  let currentDate = document.querySelector("#date-and-time");
  currentDate.innerHTML = `${hour}:${minutes} <strong>${weekday}</strong> ${day}/${month2digit}/${year}`;
  updateMode(hour);
}
function updateMode(hour) {
  let background = document.querySelector("#background");
  let greeting = document.querySelector("#greeting");
  if (((hour) => 5) && hour < 12) {
    background.classList.add("morning");
    greeting.innerHTML = "Good Morning";
  } else if (((hour) => 12) && hour < 17) {
    background.classList.add("afternoon");
    greeting.innerHTML = "Good Afternoon";
  } else if (((hour) => 17) && hour < 21) {
    background.classList.add("evening");
    greeting.innerHTML = "Good Evening";
  } else {
    background.classList.add("night");
    greeting.innerHTML = "Good Night";
  }
}
function currentLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiUrlCurrentPosition = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  let apiUrlCurrentPositionForecast = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrlCurrentPosition).then(dataUpdate);
  axios.get(apiUrlCurrentPositionForecast).then(displayForecast);
}
function currentLocationButton() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}
function citySearch(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#city-input");
  let searchedCityName = searchedCity.value;
  let apiUrlCity = `https://api.shecodes.io/weather/v1/current?query=${searchedCityName}&key=${apiKey}&units=metric`;
  let apiUrlCityForecast = `https://api.shecodes.io/weather/v1/forecast?query=${searchedCityName}&key=${apiKey}&units=metric`;
  axios.get(apiUrlCity).then(dataUpdate);
  axios.get(apiUrlCityForecast).then(displayForecast);
}

function dataUpdate(response) {
  celsiusTemp = response.data.temperature.current;
  let temperature = Math.round(celsiusTemp);
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.condition.description;

  currentCity.innerHTML = response.data.city;
  timestamp.innerHTML = timestampUpdate(response.data.time * 1000);
  celsius.classList.add("bold");
  mainTemperature.innerHTML = `${temperature}°`;
  mainWeatherDescription.innerHTML = description;
  mainHumidity.innerHTML = response.data.temperature.humidity;
  mainWindSpeed.innerHTML = wind;
  icon.innerHTML = iconSelect(response.data.condition.icon);
}

function displayForecast(response) {
  forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-7">${formatDay(forecastDay.time)}</div>
            <div class="col-2 forecast-info">
              ${iconSelect(forecastDay.condition.icon)}
            </div>
            <div class="col-2 forecast-info">${Math.round(
              forecastDay.temperature.day
            )}°</div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function timestampUpdate(timestamp) {
  let time = new Date(timestamp);
  let hours = (time.getHours() < 10 ? "0" : "") + time.getHours();
  let minutes = (time.getMinutes() < 10 ? "0" : "") + time.getMinutes();
  let day = days[time.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  return days[day];
}

function iconSelect(currentIcon) {
  if (currentIcon === "clear-sky-day" || currentIcon === "clear-sky-night") {
    return `<i class="fa-solid fa-sun"></i>`;
  } else if (
    currentIcon === "few-clouds-day" ||
    currentIcon === "few-clouds-night"
  ) {
    return `<i class="fa-solid fa-cloud-sun"></i>`;
  } else if (
    currentIcon === "scattered-clouds-day" ||
    currentIcon === "scattered-clouds-night" ||
    currentIcon === "broken-clouds-day" ||
    currentIcon === "broken-clouds-night"
  ) {
    return `<i class="fa-solid fa-cloud"></i>`;
  } else if (
    currentIcon === "shower-rain-day" ||
    currentIcon === "shower-rain-night"
  ) {
    return `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
  } else if (currentIcon === "rain-day" || currentIcon === "rain-night") {
    return `<i class="fa-solid fa-cloud-rain"></i>`;
  } else if (
    currentIcon === "thunderstorm-day" ||
    currentIcon === "thunderstorm-night"
  ) {
    return `<i class="fa-solid fa-cloud-bolt"></i>`;
  } else if (currentIcon === "snow-day" || currentIcon === "snow-night") {
    return `<i class="fa-regular fa-snowflake"></i>`;
  } else if (currentIcon === "mist-day" || currentIcon === "mist-night") {
    return `<i class="fa-solid fa-smog"></i>`;
  } else {
    return ``;
  }
}

function celsiusButton(event) {
  mainTemperature.innerHTML = `${Math.round(celsiusTemp)}°`;
  fahrenheit.classList.remove("bold");
  celsius.classList.add("bold");
}
function fahrenheitButton(event) {
  let fahrenheitTemperature = Math.round((celsiusTemp * 9) / 5 + 32);
  mainTemperature.innerHTML = `${fahrenheitTemperature}°`;
  fahrenheit.classList.add("bold");
  celsius.classList.remove("bold");
}

let celsiusTemp = null;
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentCity = document.querySelector("#main-city");
let timestamp = document.querySelector("#timestamp");
let icon = document.querySelector("#main-weather-icon");
let mainTemperature = document.querySelector("#main-temperature");
let mainWeatherDescription = document.querySelector(
  "#main-weather-description"
);
let mainHumidity = document.querySelector("#main-humidity");
let mainWindSpeed = document.querySelector("#main-wind-speed");

updateTime();
navigator.geolocation.getCurrentPosition(currentLocation);
let searchButton = document.querySelector("#city-search");
searchButton.addEventListener("submit", citySearch);
let currentCityButton = document.querySelector("#current-location-button");
currentCityButton.addEventListener("click", currentLocationButton);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusButton);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitButton);
