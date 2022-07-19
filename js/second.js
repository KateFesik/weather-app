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

let popularCities = [
  "Paris",
  "London",
  "Warsaw",
  "Vienna",
  "Lisbon",
  "Reykjavik",
  "Ottawa",
  "Havana",
  "Buenos Aires",
  "Cape Town",
  "Sydney",
  "Tokyo",
];

let firstCity = document.querySelector("#first_city");
firstCity.addEventListener("click", function (event) {
  event.preventDefault();
  cityName = document.querySelector("#first_city").innerHTML.trim();
  addNewCity();
});

let secondCity = document.querySelector("#second_city");
secondCity.addEventListener("click", function (event) {
  event.preventDefault();
  cityName = document.querySelector("#second_city").innerHTML.trim();
  addNewCity();
});

let thirdCity = document.querySelector("#third_city");
thirdCity.addEventListener("click", function (event) {
  event.preventDefault();
  cityName = document.querySelector("#third_city").innerHTML.trim();
  addNewCity();
});

let fourthCity = document.querySelector("#fourth_city");
fourthCity.addEventListener("click", function (event) {
  event.preventDefault();
  cityName = document.querySelector("#fourth_city").innerHTML.trim();
  addNewCity();
});

let fifthCity = document.querySelector("#fifth_city");
fifthCity.addEventListener("click", function (event) {
  event.preventDefault();
  cityName = document.querySelector("#fifth_city").innerHTML.trim();
  addNewCity();
});

let sixthCity = document.querySelector("#sixth_city");
sixthCity.addEventListener("click", function (event) {
  event.preventDefault();
  cityName = document.querySelector("#sixth_city").innerHTML.trim();
  addNewCity();
});

showPopularCities();
function showPopularCities() {
  let citiesList = [...popularCities]
    .sort(() => {
      return Math.random() - 0.5;
    })
    .slice(0, 6);
  firstCity.innerHTML = citiesList[0];
  secondCity.innerHTML = citiesList[1];
  thirdCity.innerHTML = citiesList[2];
  fourthCity.innerHTML = citiesList[3];
  fifthCity.innerHTML = citiesList[4];
  sixthCity.innerHTML = citiesList[5];
}
