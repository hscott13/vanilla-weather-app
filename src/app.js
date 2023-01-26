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
  currentDate.innerHTML = `${hour}:${minutes} ${weekday} ${day}/${month2digit}/${year}`;
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
function timestampUpdate(timestamp) {
  let time = new Date(timestamp);
  let hours = (time.getHours() < 10 ? "0" : "") + time.getHours();
  let minutes = (time.getMinutes() < 10 ? "0" : "") + time.getMinutes();
  let day = days[time.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function dataUpdate(response, position) {
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

  if (
    response.data.condition.icon === "clear-sky-day" ||
    response.data.condition.icon === "clear-sky-night"
  ) {
    icon.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  } else if (
    response.data.condition.icon === "few-clouds-day" ||
    response.data.condition.icon === "few-clouds-night"
  ) {
    icon.innerHTML = `<i class="fa-solid fa-cloud-sun"></i>`;
  } else if (
    response.data.condition.icon === "scattered-clouds-day" ||
    response.data.condition.icon === "scattered-clouds-night" ||
    response.data.condition.icon === "broken-clouds-day" ||
    response.data.condition.icon === "broken-clouds-night"
  ) {
    icon.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
  } else if (
    response.data.condition.icon === "shower-rain-day" ||
    response.data.condition.icon === "shower-rain-night"
  ) {
    icon.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
  } else if (
    response.data.condition.icon === "rain-day" ||
    response.data.condition.icon === "rain-night"
  ) {
    icon.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`;
  } else if (
    response.data.condition.icon === "thunderstorm-day" ||
    response.data.condition.icon === "thunderstorm-night"
  ) {
    icon.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
  } else if (
    response.data.condition.icon === "snow-day" ||
    response.data.condition.icon === "snow-night"
  ) {
    icon.innerHTML = `<i class="fa-regular fa-snowflake"></i>`;
  } else if (
    response.data.condition.icon === "mist-day" ||
    response.data.condition.icon === "mist-night"
  ) {
    icon.innerHTML = `<i class="fa-solid fa-smog"></i>`;
  } else {
    icon.innerHTML = ``;
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
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-7">${day}</div>
            <div class="col-2 forecast-info">
              <i class="fa-solid fa-sun"></i>
            </div>
            <div class="col-2 forecast-info">5°</div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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
