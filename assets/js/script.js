var cityFormEl = document.querySelector("#input-group");
var cityInputEl = document.querySelector("#form1");
var dailyForecastTitle = document.querySelector("#daily-forecast-title");
//console.log(dailyForecastTitle);
var currentForecastCity = document.querySelector("#current-forecast-city");
//var buttonEl = document.querySelector("#btn");
// var clearHistoryButtonEl = document.querySelector("#clear-history");
// var historyEl = document.querySelector("#history");
// var cityEl = document.querySelector("#city");
// var icon = document.querySelector("#icon");
var tempEl = document.querySelector("#temperature");
var humEl = document.querySelector("#humidity");
var windEl = document.querySelector("#wind-speed");
var uvEl = document.querySelector("#uv");
// var fiveDayForecast = document.querySelector("#daily-forecast");

var formSubmitHandler = function (event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
  //console.log(city);
  if (city) {
    currentCityWeather(city);
    fiveDayForecast(city);
  } else {
    alert("Please enter a valid city");
  }
};

// get current city weather
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

// get five day forecast
var fiveDayForecast = function(city) {
  var apiKey = "3f698036d7cb81fb192ca1a1ad2af845";
  var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      five_forecast(data);
    });
  });
}

var current_forecast_city = function (forecast) {
  currentForecastCity.textContent = `${forecast.name}`;
  tempEl.textContent = `Temperature: ${forecast.main.temp} °F`;
  windEl.textContent = `Wind speed: ${forecast.wind.speed} MPH`;
  humEl.textContent = `Wind speed: ${forecast.main.humidity} %`;

  var lat = forecast.coord.lat;
  var lon = forecast.coord.long;
};

var five_forecast = function(forecast){
  dailyForecastTitle.textContent = "5 Day Forecast";

  var forecastList = forecast.list;
  for (i=5; i < forecastList.length; i=i+8){
    
  }

}

cityFormEl.addEventListener("submit", formSubmitHandler);
