var date = moment().format("L");

$("#add-city").on("click", function(event) {
    event.preventDefault();
    getCurrentWeather();
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
        $(".city-name").html(response.name + " (" + date + ") ");
        $(".weather-display").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
        $(".temp").html("Temperature: " + ((response.main.temp - 273.15) * 1.8 + 32).toFixed() + "&#176;F");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".wind").html("Wind Speed: " + response.wind.speed + " MPH");
       })
  }