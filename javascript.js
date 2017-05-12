var unit, lat, lon;

$(document).ready(function() {
    var apiUrl, currentTemperature, fahrenheit, arr;

    $.getJSON("http://ipinfo.io", function(weatherData) {
        var arr = weatherData.loc.split(',');
        lat = arr[0];
        lon = arr[1];
        unit = "imperial";
        getGeoWeather();
    });
});

function getGeoWeather() {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather" + // API URL
              "?lat=" + lat + "&lon=" + lon + // Coordinates
              "&units=" + unit + // API unit
              "&APPID=d0b64bb510a4e7e925e31e1a7fb84f0d", // API key
              function(weatherData) {

        var dayTime = "-night-";
        if (weatherData.dt >= weatherData.sys.sunrise && weatherData.dt < weatherData.sys.sunset) {
            dayTime = "-day-";
        }
        var weatherIcon = "wi wi-owm" + dayTime + weatherData.weather[0].id;
        var letter = ((unit == "metric") ? 'C' : 'F');

        // Now read the weather data
        setWeatherIcon(weatherData.weather[0].main);
        $("#city").html(weatherData.name);
        $("#country").html(weatherData.sys.country);
        $("#currSkyCondition").html(weatherData.weather[0].description);
        $("#currTemperature").html(weatherData.main.temp + "° " + letter);
        $("#geoCoordinates").html("Lat: " + lat + "° / Lon: " + lon + '°');
    })
};

function setWeatherIcon(currentWeather) {
    $("#weatherIcon").text("");
    $("#weatherIcon").append("<i></i>");

    switch (currentWeather.toLowerCase()) {
    case "clouds":
        $("#weatherIcon i").addClass("wi wi-cloudy"); break;
    case "rain":
        $("#weatherIcon i").addClass("wi wi-rain"); break;
    case "snow":
        $("#weatherIcon i").addClass("wi wi-snow"); break;
    case "thunderstorm":
        $("#weatherIcon i").addClass("wi wi-thunderstorm"); break;
    case "mist":
        $("#weatherIcon i").addClass("wi wi-smoke"); break;
    default:
        $("#weatherIcon i").addClass("wi wi-day-sunny");
    }
};

function changeUnit() {
    if (unit == 'metric') unit = 'imperial';
    else unit = 'metric';

    getGeoWeather();
};

$("#toggleTemperatureUnit").click(function () {
    $("body").toggleClass("showFahrenheit");
    changeUnit();
});
