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
