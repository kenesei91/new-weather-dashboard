var cityFormEl = document.querySelector("#input-group");
var cityInputEl = document.querySelector("#form1");
//var buttonEl = document.querySelector("#btn");
// var clearHistoryButtonEl = document.querySelector("#clear-history");
// var historyEl = document.querySelector("#history");
// var cityEl = document.querySelector("#city");
// var icon = document.querySelector("#icon");
// var tempEl = document.querySelector("#temperature");
// var humEl = document.querySelector("#humidity");
// var windEl = document.querySelector("#uv");
// var fiveDayForecast = document.querySelector("#daily-forecast");

var formSubmitHandler = function (event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
  //console.log(city);
  if(city) {
    currentCityWeather(city);
    fiveDayForecast(city);
  }else{
    alert('Please enter a valid city');
  }
};

// get current city weather
var currentCityWeather = function (city) {
  var apiKey = "3f698036d7cb81fb192ca1a1ad2af845";
  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
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
    });
  });
}

cityFormEl.addEventListener("submit", formSubmitHandler);
