let placename = document.querySelector(".placename");
let time = document.querySelector(".time");
let temperature = document.querySelector(".temperature");
let icon = document.querySelector(".weather-icon");

let sunrise = document.querySelector(".settime");
let sunset = document.querySelector(".risetime");
var input = document.querySelector("#searhBox");
var search = document.querySelector("#submitButton");

function convertTime(unixTime) {
  let dt = new Date(unixTime * 1000);
  let h = dt.getHours();
  let m = "0" + dt.getMinutes();
  let t = h + ":" + m.substr(-2);
  return t;
}

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    let long;
    let lat;
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      let api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=00a7d9225856a588d48e585ff3a46237`;
      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          var seconds = Math.floor(new Date().getTime() / 1000) + data.timezone;
          let tempIconElement = data.weather[0].icon;
          placename.textContent = data.name;
          temperature.textContent = Math.floor(data.main.temp - 273) + "°C";
          icon.innerHTML = `<img src="icons/${tempIconElement}.png"/>`;
          time.textContent = new Date(seconds * 1000)
            .toISOString()
            .substr(11, 5);
          sunrise.textContent = convertTime(data.sys.sunrise) + "am";
          sunset.textContent = convertTime(data.sys.sunset) + "pm";
        });
    });
  }
});

search.addEventListener("click", function () {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      input.value +
      "&appid=00a7d9225856a588d48e585ff3a46237"
  )
    .then((response) => response.json())
    .then((data) => {
      var seconds = Math.floor(new Date().getTime() / 1000) + data.timezone;
      let tempIconElement = data.weather[0].icon;
      placename.textContent = data.name;
      temperature.textContent = Math.floor(data.main.temp - 273) + "°C";

      icon.innerHTML = `<img src="icons/${tempIconElement}.png"/>`;
      time.textContent = new Date(seconds * 1000).toISOString().substr(11, 5);
      sunrise.textContent = convertTime(data.sys.sunrise) + "am";
      sunset.textContent = convertTime(data.sys.sunset) + "pm";
    });
});
