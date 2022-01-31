var cityFormEl = document.querySelector("#input-group");
var cityInputEl = document.querySelector("#form1");
var dailyForecastTitle = document.querySelector("#daily-forecast-title");
//console.log(dailyForecastTitle);

var currentForecastCity = document.querySelector("#current-forecast-city");
var cityImage = document.querySelector("#city-image");
var tempEl = document.querySelector("#temperature");
var humEl = document.querySelector("#humidity");
var windEl = document.querySelector("#wind-speed");
var uvEl = document.querySelector("#uv");

var fiveDayContainer = document.querySelector(".five-day-container");
var fiveDayContainers = document.querySelector(".five-day-container-col");

var containerBorder = document.querySelector(".container-border");

//set searched cities into empty array
//let cities = [];

// Formhandler to search for particular city
var formSubmitHandler = function (event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
  //console.log(city);
  if (city) {
    currentCityWeather(city);
    fiveDayForecast(city);
    cityInputEl.value = "";
  } else {
    alert("Please enter a valid city");
  }
};

// API call for CURRENT DAY city weather
var currentCityWeather = function (city) {
  var apiKey = "3f698036d7cb81fb192ca1a1ad2af845";
  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      current_forecast_city(data, city);
    });
  });
};

// API call for FIVE DAY forecast
var fiveDayForecast = function (city) {
  var apiKey = "3f698036d7cb81fb192ca1a1ad2af845";
  var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      five_forecast(data);
    });
  });
};

// get current city weather
var current_forecast_city = function (forecast) {
  currentForecastCity.textContent = `${forecast.name}`;
  tempEl.textContent = `Temperature: ${forecast.main.temp} °F`;
  windEl.textContent = `Wind speed: ${forecast.wind.speed} MPH`;
  humEl.textContent = `Wind speed: ${forecast.main.humidity} %`;

  var forecastDate = document.createElement("span");
  forecastDate.textContent = ` (${moment(forecast.dt.value).format("l")})`;
  currentForecastCity.appendChild(forecastDate);

  var forecastIcon = document.createElement("img");
  forecastIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
  );
  currentForecastCity.appendChild(forecastIcon);

  var lat = forecast.coord.lat;
  var lon = forecast.coord.long;
};

// get 5 day forecast to display in cards
var five_forecast = function (forecast) {
  fiveDayContainer.textContent = "";
  dailyForecastTitle.textContent = "5-Day Forecast";

  var forecastList = forecast.list;
  for (var i = 5; i < forecastList.length; i = i + 8) {
    var forecastListBox = forecastList[i];
    console.log(forecastListBox);

    var forecastDay = document.createElement("div");
    forecastDay.classList = "card bg-info m-2";

    var forecast5Date = document.createElement("h5");
    forecast5Date.textContent = moment
      .unix(forecastListBox.dt)
      .format("MMM D, YYYY");
    forecast5Date.classList = "card-header text-center text-white";
    forecastDay.appendChild(forecast5Date);
    console.log(forecast5Date);

    var forecastIcon = document.createElement("img");
    forecastIcon.classList = "card-image";
    forecastIcon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${forecastListBox.weather[0].icon}@2x.png`
    );
    forecastDay.appendChild(forecastIcon);

    var forecastTemp = document.createElement("span");
    forecastTemp.classList = "card-footer text-center text-white";
    forecastTemp.textContent = forecastListBox.main.temp + " °F";
    forecastDay.appendChild(forecastTemp);

    var forecastHum = document.createElement("span");
    forecastHum.classList = "card-text text-center text-white";
    forecastHum.textContent = forecastListBox.main.humidity + "  %";
    forecastDay.appendChild(forecastHum);

    fiveDayContainer.appendChild(forecastDay);
  }
};

var pastSearch = function (pastSearch) {
  // console.log(pastSearch)

  pastSearchEl = document.createElement("button");
  pastSearchEl.textContent = pastSearch;
  pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
  pastSearchEl.setAttribute("data-city", pastSearch);
  pastSearchEl.setAttribute("type", "submit");

  pastSearchButtonEl.prepend(pastSearchEl);
};

var pastSearchHandler = function (event) {
  var city = event.target.getAttribute("data-city");
  if (city) {
    getCityWeather(city);
    get5Day(city);
  }
};

cityFormEl.addEventListener("submit", formSubmitHandler);
