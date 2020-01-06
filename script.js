var date = moment().format("L");
var cities = [];
var localCities = JSON.parse(localStorage.getItem("cities"));

$("#add-city").on("click", function(event) {
    event.preventDefault();
    getCurrentWeather();
    $(".five-day").empty();
    renderButtons();
});

function getCurrentWeather() {
  var cityInput = $("#city-input").val();
  var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=d826ebf2a38a534fcc03caba12e863aa";  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
        localCities.push(cityInput);
        localStorage.setItem("cities", JSON.stringify(localCities));
        $(".city-name").html(response.name + "(" + date + ")");
        $(".weather-display").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
        $(".temp").html("Temperature: " + ((response.main.temp - 273.15) * 1.8 + 32).toFixed() + "&#176;F");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".wind").html("Wind Speed: " + response.wind.speed + " MPH");
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        queryURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?&appid=d826ebf2a38a534fcc03caba12e863aa&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            $(".uv-index").text("UV Index: ");
            $(".uv-index").append(response[0].value);
        })
        getFiveDay();
       });
}
   
  
// Function to get 5 day forecast
function getFiveDay() {
  var cityInput = $("#city-input").val();
  var queryURLFive = "http://api.openweathermap.org/data/2.5/forecast?appid=d826ebf2a38a534fcc03caba12e863aa&q=" + cityInput + "&count=10";
    $.ajax({
    url: queryURLFive,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    for (i = 0; i <= 4; i++) {
      console.log(i)
      var nextDay = moment().add(1 + i, 'days').format('MM/DD/YYYY');
      var cityIconForecast = response.list[i].weather[0].icon;
      var cityIconURLForecast = "http://openweathermap.org/img/w/" + cityIconForecast + ".png";
      var cityTempForecast = ((response.list[i].main.temp - 273.15) * 1.8 + 32).toFixed();
      var cityHumidityForecast = response.list[i].main.humidity;
      
      $(".five-day")
      .append($("<div>").addClass("col-sm-2 days")
      .append($("<p>").html(nextDay))//Add the day for the forecast
      .append($("<img src=" + cityIconURLForecast + ">")) //add the weather icon
      .append($("<p>").html("Temp: " + cityTempForecast + " °F"))//add the temperature
      .append($("<p>").html("Humidity: " + cityHumidityForecast + "%")))//add the humidity
      console.log(nextDay + ", " + cityHumidityForecast + ", " + cityTempForecast);
    }
  });
}






  



 
