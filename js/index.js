let apiKey = "6044b52d072e537df7be674146654ba7";

let nameCity = document.querySelector("#city_name");
let nameCounty = document.querySelector("#county_name");
let tempValue = document.querySelector("#temp_value");
let descriptionInfo = document.querySelector(".description");
let maxTemp = document.querySelector("#max_temp");
let minTemp = document.querySelector("#min_temp");
let humidity = document.querySelector("#value_humidity");
let wind = document.querySelector("#value_wind");
let iconWeather = document.querySelector(".icon_weather");
let degreesMax = document.querySelector("#degrees_max");
let degreesMin = document.querySelector("#degrees_min");
let dateInfo = document.querySelector("#date");

let currentCityName;
setCurrentCityName();
function setCurrentCityName() {
  currentCityName = new URLSearchParams(window.location.search).get("city");
  if (currentCityName != undefined) {
    nameCity.innerHTML = currentCityName;
  } else {
    nameCity.innerHTML = "Odesa";
    currentCityName = "Odesa";
  }
}

requestWeatherByCity();

//request weather by location
function requestWeatherByLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude.toFixed(2);
    let lon = position.coords.longitude.toFixed(2);
    let apiUrlLocation = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&units=metric&APPID=${apiKey}`;
    axios.get(apiUrlLocation).then(showWeather);
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
  let getCountryNames = new Intl.DisplayNames(["en"], { type: "region" });
  nameCounty.innerHTML = getCountryNames.of(response.data.sys.country);
  nameCity.innerHTML = response.data.name;
  tempValue.innerHTML = Math.round(response.data.main.temp);
  descriptionInfo.innerHTML = response.data.weather[0].description;
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  let icon = response.data.weather[0].icon;

  setAttributes(iconWeather, {
    src: `http://openweathermap.org/img/wn/${icon}@2x.png`,
    alt: response.data.weather[0].main,
  });
  dateInfo.innerHTML = formatDate(response.data.dt * 1000);

  getForecast(response.data.coord);
}

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

//add last updated time
function formatDate(timestamp) {
  let date = new Date(timestamp);
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

//change type temperature
let metric = "celsius";
function changeTempValueToC(event) {
  event.preventDefault();
  if (metric === "celsius") {
    tempValue.innerHTML = Math.round(tempValue.innerHTML * 1.8 + 32);
    minTemp.innerHTML = Math.round(minTemp.innerHTML * 1.8 + 32);
    maxTemp.innerHTML = Math.round(maxTemp.innerHTML * 1.8 + 32);
    degreesMax.innerHTML = "°F";
    degreesMin.innerHTML = "°F";
    metric = "fahrenheit";
  }
}
function changeTempValueToF(event) {
  event.preventDefault();
  if (metric === "fahrenheit") {
    tempValue.innerHTML = Math.round((5 / 9) * (tempValue.innerHTML - 32));
    minTemp.innerHTML = Math.round((5 / 9) * (minTemp.innerHTML - 32));
    maxTemp.innerHTML = Math.round((5 / 9) * (maxTemp.innerHTML - 32));
    degreesMax.innerHTML = "°C";
    degreesMin.innerHTML = "°C";

    metric = "celsius";
  }
}
let tempFahrenheit = document.querySelector("#fahrenheit");
let tempCelsius = document.querySelector("#celsius");
tempValue = document.querySelector("#temp_value");

tempFahrenheit.addEventListener("click", changeTempValueToC);
tempCelsius.addEventListener("click", changeTempValueToF);

//go to second.html
let weatherButton = document.querySelector(".btn_go_second");
weatherButton.addEventListener("click", goToSecond);

function goToSecond(event) {
  event.preventDefault();
  window.location.href = "second.html";
}

//add forecast
function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function getForecast(coord) {
  let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiForecastUrl).then(displayForecast);
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatForecastDate(
          forecastDay.dt
        )}</div>
        <img
          class="icons_daily"
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span id="forecast_temp">${Math.round(forecastDay.temp.day)}</span>
          <span id="forecast_degrees">°C</span>
        </div>
      </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
