
// API KEY: c5d1880499d15c30a82c4b04a976bfaa
function getCurrentWeather(latitude, longitude) {
    $.get("http://api.openweathermap.org/data/2.5/weather", {
        APPID: "c5d1880499d15c30a82c4b04a976bfaa",
        lat:    latitude,
        lon:    longitude,
        units: "imperial"
    }).fail(function (error) {
        console.log(error);
    }).done(function(currentWeather) {
        buildCurrentWeather(currentWeather);
        createMap(latitude, longitude, currentWeather.name)
    });
}

function buildCurrentWeather(weather) {

    var backgrounds = {
        200 : "thunderstorm",
        300 : "light_intensity_drizzle",
        500 : "light_rain",
        501 : "moderate_rain",
        502 : "heavy_intensity_rain",
        600 : "light_snow",
        800 : "clear",
        801 : "few_clouds",
        802 : "scattered_clouds"
    };

    var htmlWeatherContent = "";
    htmlWeatherContent += "<div class='col-xs-12'><div class='thumbnail " + backgrounds[weather.weather[0].id] + "'><h2 class='text-center'>"
        + weather.main.temp_max + "&deg;/ " + weather.main.temp_min + "&deg;</h2><img src='http://openweathermap.org/img/w/"
        + weather.weather[0].icon + ".png'><p class='text-center'><strong>Condition: </strong>" + weather.weather[0].description + "</p><p class='text-center'><strong>Clouds: </strong>" + weather.clouds.all
        + "</p><p class='text-center'><strong>Humidity: </strong>" + weather.main.humidity +
        "</p><p class='text-center'><strong>Winds: </strong>" + weather.wind.speed +
        "</p><p class='text-center'><strong>Pressure: </strong>" + weather.main.pressure + "</p></div></div>";

    var htmlPanelTitle = "<h3 class='panel-title'>" + weather.name + " Current Weather</h3>";

    $("#currentWeatherTitle").html(htmlPanelTitle);
    $("#currentWeather").html(htmlWeatherContent);

}

function getWeatherForecast(latitude, longitude, days) {
    $.get("http://api.openweathermap.org/data/2.5/forecast/daily", {
        APPID: "c5d1880499d15c30a82c4b04a976bfaa",
        lat:   latitude,
        lon:   longitude,
        units: "imperial",
        cnt: days
    }).fail(function (error) {
        console.log(error);
    }).done(function(weatherForecast) {
        buildForecast(weatherForecast, days);
    });
}

function buildForecast(weatherForecast, days) {

    var backgrounds = {
        200 : "thunderstorm",
        300 : "light_intensity_drizzle",
        500 : "light_rain",
        501 : "moderate_rain",
        502 : "heavy_intensity_rain",
        600 : "light_snow",
        800 : "clear",
        801 : "few_clouds",
        802 : "scattered_clouds"
    };

    var htmlWeatherContent = "";
    weatherForecast.list.forEach(function (day, index) {

        htmlWeatherContent += "<div class='col-xs-4'><div class='thumbnail " + backgrounds[day.weather[0].id] + "'><h2 class='text-center'>"
            + day.temp.max + "&deg;/ " + day.temp.min + "&deg;</h2><img src='http://openweathermap.org/img/w/"
            + day.weather[0].icon + ".png'><p class='text-center'><strong>Condition: </strong>" + day.weather[0].description + "</p><p class='text-center'><strong>Clouds: </strong>" + day.clouds
            + "</p><p class='text-center'><strong>Humidity: </strong>" + day.humidity +
            "</p><p class='text-center'><strong>Winds: </strong>" + day.speed +
            "</p><p class='text-center'><strong>Pressure: </strong>" + day.pressure + "</p></div></div>"
    });
    var htmlPanelTitle = "<h3 class='panel-title'>" + weatherForecast.city.name + " " + days + " Days Forecast</h3>";
    $("#weatherForecastTitle").html(htmlPanelTitle);
    $("#weatherForecast").html(htmlWeatherContent);
}


// <!-- Google Maps API -->
function createMap(lat, lng, cityName) {
    // Set our map options
    var mapOptions = {
        // Set the zoom level
        zoom: 10,

        // This sets the center of the map at our location
        center: {
            lat:  parseFloat(lat),
            lng:  parseFloat(lng)
        }
    };
    var mapTitle = "<h3 class='panel-title'>" + cityName + " Map</h3>";
    $("#mapTitle").html(mapTitle);

    // Render the map
    var map = new google.maps.Map($("#map").get(0), mapOptions);
}


getCurrentWeather(29.423017, -98.48527);
getWeatherForecast(29.423017, -98.48527, 3);


// Button

$("#getWeather").on("click", function () {
    event.preventDefault();
    var latitude = $("#latitude").val();
    var longitude = $("#longitude").val();
    var days = $("#days").val();
    getCurrentWeather(latitude, longitude);
    getWeatherForecast(latitude, longitude, days);
    createMap(latitude, longitude)
});




/*
San Antonio
lat:    29.423017,
lon:   -98.48527,

Tampico
lat: 22.274265
lon: -97.878155
    */



