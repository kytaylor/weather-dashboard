// API key
var APIKey = "f899658bec757e89390b5ec8e203720c";

// ------------------------------------------------
// Retrieves last searched info from local storage and displays it
$(".city-name").text(localStorage.getItem("weather-city"));
$(".wind").text(localStorage.getItem("weather-wind"));
$(".humidity").text(localStorage.getItem("weather-humidity"));
var newImg = $("<img>")
$(newImg).attr("src", localStorage.getItem("weather-icon"));
$(".icon").append(newImg);
$(".uv-index").text(localStorage.getItem("weather-uvi"));
uviColor(localStorage.getItem("weather-uvi"));

$(".temp-one").text(localStorage.getItem("day-one-temp"));
$(".humidity-one").text(localStorage.getItem("day-one-humidity"));
var newImg = $("<img>")
$(newImg).attr("src", localStorage.getItem("day-one-icon"));
$(".icon-one").append(newImg);

$(".temp-two").text(localStorage.getItem("day-two-temp"));
$(".humidity-two").text(localStorage.getItem("day-two-humidity"));
var newImg = $("<img>")
$(newImg).attr("src", localStorage.getItem("day-two-icon"));
$(".icon-two").append(newImg);

$(".temp-three").text(localStorage.getItem("day-three-temp"));
$(".humidity-three").text(localStorage.getItem("day-three-humidity"));
var newImg = $("<img>")
$(newImg).attr("src", localStorage.getItem("day-three-icon"));
$(".icon-three").append(newImg);

$(".temp-four").text(localStorage.getItem("day-four-temp"));
$(".humidity-four").text(localStorage.getItem("day-four-humidity"));
var newImg = $("<img>")
$(newImg).attr("src", localStorage.getItem("day-four-icon"));
$(".icon-four").append(newImg);

$(".temp-five").text(localStorage.getItem("day-five-temp"));
$(".humidity-five").text(localStorage.getItem("day-five-humidity"));
var newImg = $("<img>")
$(newImg).attr("src", localStorage.getItem("day-five-icon"));
$(".icon-five").append(newImg);

// ------------------------------------------------

// Initial array of cities
var cities = [];

// Setting dates
var date = moment().format("MM/DD/YYYY");
$(".current-date").text(date);

var date = moment().add(1, 'days').format("MM/DD/YYYY");
$(".card-date-one").text(date);

var date = moment().add(2, 'days').format("MM/DD/YYYY");
$(".card-date-two").text(date);

var date = moment().add(3, 'days').format("MM/DD/YYYY");
$(".card-date-three").text(date);

var date = moment().add(4, 'days').format("MM/DD/YYYY");
$(".card-date-four").text(date);

var date = moment().add(5, 'days').format("MM/DD/YYYY");
$(".card-date-five").text(date);

function displayCityInfo() {
  $(".icon").empty();
  $(".icon-one").empty();
  $(".icon-two").empty();
  $(".icon-three").empty();
  $(".icon-four").empty();
  $(".icon-five").empty();

  var city = $(this).attr("data-name");
  console.log(city)
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

  // Creates AJAX call for the specific city button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response)
    
    $(".city-name").text(response.name);
    $(".wind").text(response.wind.speed);
    $(".humidity").text(response.main.humidity);

    var icon = response.weather[0].icon;
    var iconLink = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    var newImg = $("<img>")
    $(newImg).attr("src", iconLink);
    $(".icon").append(newImg);

    var dayOneTemp = tempConvert(response.main.temp);
    var newTempOne = dayOneTemp.toFixed(2)
    $(".temp").text(newTempOne);

    console.log(response.coord.lat)
    console.log(response.coord.lon)
    var latitude = response.coord.lat;
    var longitude = response.coord.lon;

    // Adds all necessary info to local storage
    localStorage.setItem("weather-city", response.name);
    localStorage.setItem("weather-wind", response.wind.speed);
    localStorage.setItem("weather-humidity", response.main.humidity);
    localStorage.setItem("weather-temp", newTempOne);
    localStorage.setItem("weather-icon", iconLink);

    forecast(latitude, longitude)
  });

}

function forecast(x, y) {
  var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + x + "&lon=" + y + "&appid=" + APIKey;
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response)

    // UV index, double check later to ensure working properly
    var uvi = response.current.uvi;
    $(".uv-index").text(uvi);
    // Changing color of UV index depending on uvi value
    uviColor(uvi);

    // Saves uvi to local storage
    localStorage.setItem("weather-uvi", uvi);

    // Day 1
    var icon = response.daily[0].weather[0].icon;
    var iconLink = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    var newImg = $("<img>")
    $(newImg).attr("src", iconLink);
    $(".icon-one").append(newImg);

    var dayOneTemp = tempConvert(response.daily[0].temp.day);
    var newTempOne = dayOneTemp.toFixed(2)
    $(".temp-one").text(newTempOne);
    $(".humidity-one").text(response.daily[0].humidity);

    // Local storage
    localStorage.setItem("day-one-icon", iconLink);
    localStorage.setItem("day-one-temp", newTempOne);
    localStorage.setItem("day-one-humidity", response.daily[0].humidity);

    // Day 2
    var icon = response.daily[1].weather[0].icon;
    var iconLink = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    var newImg = $("<img>")
    $(newImg).attr("src", iconLink);
    $(".icon-two").append(newImg);

    var dayTwoTemp = tempConvert(response.daily[1].temp.day);
    var newTempTwo = dayTwoTemp.toFixed(2)
    $(".temp-two").text(newTempTwo);
    $(".humidity-two").text(response.daily[1].humidity);

    // Local storage
    localStorage.setItem("day-two-icon", iconLink);
    localStorage.setItem("day-two-temp", newTempTwo);
    localStorage.setItem("day-two-humidity", response.daily[1].humidity);

    // Day 3
    var icon = response.daily[2].weather[0].icon;
    var iconLink = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    var newImg = $("<img>")
    $(newImg).attr("src", iconLink);
    $(".icon-three").append(newImg);

    var dayThreeTemp = tempConvert(response.daily[2].temp.day);
    var newTempThree = dayThreeTemp.toFixed(2)
    $(".temp-three").text(newTempThree);
    $(".humidity-three").text(response.daily[2].humidity);

    // Local storage
    localStorage.setItem("day-three-icon", iconLink);
    localStorage.setItem("day-three-temp", newTempThree);
    localStorage.setItem("day-three-humidity", response.daily[2].humidity);

    // Day 4
    var icon = response.daily[3].weather[0].icon;
    var iconLink = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    var newImg = $("<img>")
    $(newImg).attr("src", iconLink);
    $(".icon-four").append(newImg);

    var dayFourTemp = tempConvert(response.daily[3].temp.day);
    var newTempFour = dayFourTemp.toFixed(2)
    $(".temp-four").text(newTempFour);
    $(".humidity-four").text(response.daily[3].humidity);

    // Local storage
    localStorage.setItem("day-four-icon", iconLink);
    localStorage.setItem("day-four-temp", newTempFour);
    localStorage.setItem("day-four-humidity", response.daily[3].humidity);

    // Day 5
    var icon = response.daily[4].weather[0].icon;
    var iconLink = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    var newImg = $("<img>")
    $(newImg).attr("src", iconLink);
    $(".icon-five").append(newImg);

    var dayFiveTemp = tempConvert(response.daily[4].temp.day);
    var newTempFive = dayFiveTemp.toFixed(2)
    $(".temp-five").text(newTempFive);
    $(".humidity-five").text(response.daily[4].humidity);

    // Local storage
    localStorage.setItem("day-five-icon", iconLink);
    localStorage.setItem("day-five-temp", newTempFive);
    localStorage.setItem("day-five-humidity", response.daily[4].humidity);
  });
}

// Function for converting the temperature from Kelvin to Fahrenheit
function tempConvert(x) {
  var tempK = x;
  console.log(x)
  var tempF = (tempK - 273.15) * 1.80 + 32;
  return tempF;
}

// Function for displaying movie data
function renderButtons() {
  $("#buttons-view").empty();

  for (var i = 0; i < cities.length; i++) {
    var a = $("<button>");
    a.addClass("city");
    a.attr("data-name", cities[i]);
    a.text(cities[i]);
    $("#buttons-view").append(a);
  }
}

// This function handles events where the add movie button is clicked
$("#add-city").on("click", function(event) {
  event.preventDefault();

  var city = $("#city-input").val().trim();
  cities.push(city);
  renderButtons();
});

// Function for changing color of uvi based on uvi value
function uviColor(uvi) {
  if (uvi >= 0 && uvi <= 2) {
    $(".uv-index").css({"backgroundColor" : "green"});
  } else if (uvi >= 3 && uvi <= 5) {
    $(".uv-index").css({"backgroundColor" : "yellow"});
  } else if (uvi >= 6 && uvi <= 7) {
    $(".uv-index").css({"backgroundColor" : "orange"});
  } else if (uvi >= 8 && uvi <= 10) {
    $(".uv-index").css({"backgroundColor" : "red"});
  } else if (uvi >= 11) {
    $(".uv-index").css({"backgroundColor" : "purple"});
  }
}

// Adding click event listeners to all elements with a class of "city"
$(document).on("click", ".city", displayCityInfo);

renderButtons();