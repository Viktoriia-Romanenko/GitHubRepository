function displayWeatherCondition(responce) {
  console.log(responce.data);

  document.querySelector("#current-city").innerHTML = responce.data.name;

  celsiusTemperature = responce.data.main.temp;
  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${responce.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    responce.data.wind.speed
  )}km/h`;
  document.querySelector("#description").innerHTML =
    responce.data.weather[0].description;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png`
    );
}

function searchCity(city) {
  let apiKey = "adbe6ca52125cfde48edc6e69820c211";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  // console.log(axios);
  axios.get(`${apiUrl}`).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function weekParameters(event) {
  // event.preventDefault();
  let currentTime = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentTime.getDay()];
  let weekDay = document.querySelector("#current-weekday");
  weekDay.innerHTML = `${day}`;

  let date = currentTime.getDate();

  let months = [
    "January",
    "Fabruary",
    "Marc",
    "April",
    "May",
    "Jun",
    "July",
    "August",
    "September",
    "October",
    "Nowember",
    "December",
  ];
  let month = months[currentTime.getMonth()];

  let currentDay = document.querySelector("#current-day");
  currentDay.innerHTML = `${date} ${month}`;

  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let current = document.querySelector("#current-time");
  current.innerHTML = `${hours}:${minutes}`;
}

form.addEventListener("submit", weekParameters);

function searchLocation(position) {
  let apiKey = "adbe6ca52125cfde48edc6e69820c211";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  // console.log(apiUrl);
  axios.get(`${apiUrl}`).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function displayFahrengheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  //remove the active class from the celsius link
  celsiusLink.classList.remove("active-celsius");
  fahrenheightLink.classList.add("active-celsius");
  let fahrenheit = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperature.innerHTML = fahrenheit;
}

let celsiusTemperature = null;

let fahrenheightLink = document.querySelector("#farenheight");
fahrenheightLink.addEventListener("click", displayFahrengheit);

function displaycelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  fahrenheightLink.classList.remove("active-celsius");
  celsiusLink.classList.add("active-celsius");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celcius");
celsiusLink.addEventListener("click", displaycelsius);

searchCity("London");
weekParameters();
