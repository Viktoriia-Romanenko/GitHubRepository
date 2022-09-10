function displayWeatherCondition(responce) {
  console.log(responce.data);

  document.querySelector("#current-city").innerHTML = responce.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    responce.data.main.temp
  );
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

searchCity("London");
weekParameters();
