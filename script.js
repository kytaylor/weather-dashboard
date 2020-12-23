// This is our API key. Add your own API key between the ""
var APIKey = "f899658bec757e89390b5ec8e203720c";

// // Here we are building the URL we need to query the database
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=" + APIKey;

// // We then created an AJAX call
// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function(response) {
//   // Create CODE HERE to Log the queryURL
//     console.log(queryURL)
//     // Create CODE HERE to log the resulting object
//     console.log(response)
//     // Create CODE HERE to calculate the temperature (converted from Kelvin)
//     $(".city").text("City: " + response.name);
//     $(".wind").text("Wind speed: " + response.wind.speed);
//     $(".humidity").text("Humidity: " + response.main.humidity);
//     $(".temp").text("Temp (K): " + response.main.temp);
//     // Create CODE HERE to transfer content to HTML
//     // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
//     var tempK = response.main.temp;
//     console.log(tempK)
//     var tempF = (tempK - 273.15) * 1.80 + 32;

//     $(".temp2").text("Temp (F): " + tempF);
//     // Create CODE HERE to dump the temperature content into HTML
// });

// ------------------------------------------------

// Initial array of cities
var cities = ["Portland", "Hollywood"];

function displayCityInfo() {
  $("#cities-view").empty();

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

    var dayOneTemp = tempConvert(response.main.temp);
    var newTempOne = dayOneTemp.toFixed(2)
    $(".temp").text(newTempOne);

    console.log(response.coord.lat)
    console.log(response.coord.lon)
    var latitude = response.coord.lat;
    var longitude = response.coord.lon;

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
    $(".uv-index").text(response.current.uvi);

    // Day 1
    var dayOneTemp = tempConvert(response.daily[0].temp.day);
    var newTempOne = dayOneTemp.toFixed(2)
    $(".temp-one").text(newTempOne);
    $(".humidity-one").text(response.daily[0].humidity);

    // Day 2
    var dayTwoTemp = tempConvert(response.daily[1].temp.day);
    var newTempTwo = dayTwoTemp.toFixed(2)
    $(".temp-two").text(newTempTwo);
    $(".humidity-two").text(response.daily[1].humidity);

    // Day 3
    var dayThreeTemp = tempConvert(response.daily[2].temp.day);
    var newTempThree = dayThreeTemp.toFixed(2)
    $(".temp-three").text(newTempThree);
    $(".humidity-three").text(response.daily[2].humidity);

    // Day 4
    var dayFourTemp = tempConvert(response.daily[3].temp.day);
    var newTempFour = dayFourTemp.toFixed(2)
    $(".temp-four").text(newTempFour);
    $(".humidity-four").text(response.daily[3].humidity);

    // Day 5
    var dayFiveTemp = tempConvert(response.daily[4].temp.day);
    var newTempFive = dayFiveTemp.toFixed(2)
    $(".temp-five").text(newTempFive);
    $(".humidity-five").text(response.daily[4].humidity);
  });
}

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

// Adding click event listeners to all elements with a class of "city"
$(document).on("click", ".city", displayCityInfo);

renderButtons();