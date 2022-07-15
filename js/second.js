let cityName;
function addNewCity() {
  if (cityName === null || cityName.length === 0) {
    alert("Sorry, invalid city name.");
  } else {
    var newCityName = new URLSearchParams();
    newCityName.append("city", cityName);
    window.location.href = "index.html?" + newCityName.toString();
  }
}

document
  .querySelector(".btn_add_city")
  .addEventListener("click", function (event) {
    event.preventDefault();
    cityName = inputCity.value;
    addNewCity();
  });

let inputCity = document.querySelector("#input_city");

document.querySelector("#london").addEventListener("click", function (event) {
  event.preventDefault();
  cityName = document.querySelector("#london").innerHTML.trim();
  addNewCity();
});

document.querySelector("#larnaca").addEventListener("click", function (event) {
  event.preventDefault();
  cityName = document.querySelector("#larnaca").innerHTML.trim();
  addNewCity();
});

document.querySelector("#berlin").addEventListener("click", function (event) {
  event.preventDefault();
  cityName = document.querySelector("#berlin").innerHTML.trim();
  addNewCity();
});

document.querySelector("#lviv").addEventListener("click", function (event) {
  event.preventDefault();
  cityName = document.querySelector("#lviv").innerHTML.trim();
  addNewCity();
});

document.querySelector("#cologne").addEventListener("click", function (event) {
  event.preventDefault();
  cityName = document.querySelector("#cologne").innerHTML.trim();
  addNewCity();
});

document.querySelector("#born").addEventListener("click", function (event) {
  event.preventDefault();
  cityName = document.querySelector("#born").innerHTML.trim();
  addNewCity();
});
