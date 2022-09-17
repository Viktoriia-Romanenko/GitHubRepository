function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row week-container">`;
  let days = ["Sat", "Sun", "Mon"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 borders-settings">
                        
                        <div class="weather-forecast-date">${formatDay(
                          forecastDay.dt
                        )}</div>
                        <div class="card">
                          <img src="https://openweathermap.org/img/wn/${
                            forecastDay.weather[0].icon
                          }@2x.png" class="responsive" alt="" width="42"/>
                          <div class="card-body">
                          </div>
                       
                          <div class="weather-forecast-temperatures">
                          <span class="weather-forecast-temperature-max">
                          ${Math.round(forecastDay.temp.max)}°
                        </span>
                        <span class="weather-forecast-temperature-min">
                          ${Math.round(forecastDay.temp.min)}°
                        </span>
                        </div>
                       
                      </div>
                      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  // console.log(coordinates);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  // console.log(response.data);
  let temperatureElement = document.querySelector("#current-temperature");
  let cityelement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityelement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "adbe6ca52125cfde48edc6e69820c211";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  // console.log(axios);
  axios.get(`${apiUrl}`).then(displayTemperature);
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
