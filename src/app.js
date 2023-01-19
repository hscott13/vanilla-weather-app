let apiKey = "0d6e6a447f07653a71842ab1529ot22b";
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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
  axios.get(apiUrlCurrentPosition).then(dataUpdate);
}
function timestampUpdate(timestamp) {
  let time = new Date(timestamp);
  let hours = (time.getHours() < 10 ? "0" : "") + time.getHours();
  let minutes = (time.getMinutes() < 10 ? "0" : "") + time.getMinutes();
  let day = days[time.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function dataUpdate(response, position) {
  let currentCity = document.querySelector("#main-city");
  let timestamp = document.querySelector("#timestamp");
  let mainTemperature = document.querySelector("#main-temperature");
  let mainWeatherDescription = document.querySelector(
    "#main-weather-description"
  );
  let mainHumidity = document.querySelector("#main-humidity");
  let mainWindSpeed = document.querySelector("#main-wind-speed");

  let temperature = Math.round(response.data.temperature.current);
  let wind = Math.round(response.data.wind.speed);
  currentCity.innerHTML = response.data.city;
  timestamp.innerHTML = timestampUpdate(response.data.time * 1000);
  mainTemperature.innerHTML = `${temperature}°`;
  mainWeatherDescription.innerHTML = response.data.condition.description;
  mainHumidity.innerHTML = response.data.temperature.humidity;
  mainWindSpeed.innerHTML = wind;
}

updateTime();
navigator.geolocation.getCurrentPosition(currentLocation);
