//const cityInputEl = document.querySelector("#form1");
const buttonEl = document.querySelector("#btn");
const clearHistoryButtonEl = document.querySelector("#clear-history");
const historyEl = document.querySelector("#history");
const cityEl = document.querySelector("#city");
const icon = document.querySelector("#icon");
const tempEl = document.querySelector("#temperature");
const humEl = document.querySelector("#humidity");
const windEl = document.querySelector("#uv");
const fiveDayForecast = document.querySelector("#daily-forecast");

// const formSumbitHandler = function(event) {
//     event.preventDefault();
//     const cityInputEl = document.querySelector("#form1").value.trim();
//     if(cityInputEl){
//         console.log("input confirmed");
//     }
// }

const getCityWeather = function getweather() {
  const city = "Austin";
  const apiKey = "3f698036d7cb81fb192ca1a1ad2af845";
  const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
};

getCityWeather();

// buttonEl.addEventListener('submit', formSumbitHandler);
