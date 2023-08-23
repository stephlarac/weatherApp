exports.getImageDesc = function(weatherIcon){
    if (weatherIcon=== "01d" || weatherIcon === "01n"){
        return  "clear_sky";
    } else if (weatherIcon=== "02d" || weatherIcon === "02n"){
        return "few_clouds";
    } else if (weatherIcon=== "03d" || weatherIcon === "03n"){
        return "scattered_clouds";
    } else if (weatherIcon=== "04d" || weatherIcon === "04n"){
        return "broken_clouds";
    } else if (weatherIcon=== "09d" || weatherIcon === "09n"){
        return "shower_rain";
    } else if (weatherIcon=== "10d" || weatherIcon === "10n"){
        return "rain";
    } else if (weatherIcon=== "11d" || weatherIcon === "11n"){
        return "thunderstorm";
    } else if (weatherIcon=== "13d" || weatherIcon === "13n"){
        return "snow";
    } else if (weatherIcon=== "50d" || weatherIcon === "50n"){
        return "mist";
    } else {
        console.log("ERROR");
    }
}