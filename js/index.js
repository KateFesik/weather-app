let apiKey = "6044b52d072e537df7be674146654ba7";

let newCity = document.querySelector("#city_name");
let tempValue = document.querySelector("#temp_value");
let mainInfo = document.querySelector(".main_info");
let maxTemp = document.querySelector("#max_temp");
let minTemp = document.querySelector("#min_temp");
let humidity = document.querySelector("#value_humidity");
let wind = document.querySelector("#value_wind");
let iconWeather = document.querySelector(".icon_weather");
let degreesMax = document.querySelector("#degrees_max");
let degreesMin = document.querySelector("#degrees_min");

let currentCityName = "...";
currentCityName = new URLSearchParams(window.location.search).get("city");
newCity.innerHTML = currentCityName;

requestWeatherByCity();

//request weather by location
function requestWeatherByLocation() {
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude.toFixed(2);
    let long = position.coords.longitude.toFixed(2);
    let apiUrlLocation = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${long}&units=metric&APPID=${apiKey}`;
    axios.get(apiUrlLocation).then(showCityOnLocation);
  });
}

let btnLocation = document.querySelector(".btn_location");
btnLocation.addEventListener("click", requestWeatherByLocation);

//request weather by new city
function requestWeatherByCity() {
  let apiUrlByCity = `https://api.openweathermap.org/data/2.5/weather?q=${currentCityName}&units=metric&APPID=${apiKey}`;
  axios.get(apiUrlByCity).then(showWeather);
}

//show weather by current city
function showWeather(response) {
  newCity.innerHTML = response.data.name;
  tempValue.innerHTML = Math.round(response.data.main.temp);
  mainInfo.innerHTML = response.data.weather[0].main;
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  let icon = response.data.weather[0].icon;
  iconWeather.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

//add day time
let date = new Date();
setDayTime();
function dayTime() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let time;
  if (minutes < 10) {
    time = `${hours}:0${minutes}`;
  } else {
    time = `${hours}:${minutes}`;
  }
  return `${day} ${time}`;
}
function setDayTime() {
  let dateInfo = document.querySelector(".date_info");
  dateInfo.innerHTML = dayTime();
}
