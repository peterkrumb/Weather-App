function getCurrentWeather() {
    getFiveDay(city);
  
    //For Todays Weather
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d826ebf2a38a534fcc03caba12e863aa";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        console.log(response);
  }