const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const weatherDesc = require(__dirname + "/weatherDesc.js"); //local module
const secrets = require(__dirname + "/secret.js"); //local module

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const API_Key = secrets.getAPIKey();
const today = new Date().toLocaleDateString('en-us',{ weekday:"long", hour: "numeric", minute: "2-digit"});


app.get('/',(req,res)=>{
        res.render("index.ejs", { name: "City", temp: "", tempMax: "", tempMin: "", 
            feelsLike: "", windSpeed: "", imageDesc: "clear_sky", date: today, iconURL: "", show: "hidden"});
});

app.post("/", async(req,res)=>{
    const cityName = req.body.cityName;
    const geoCoding_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_Key}`;

    try {
        const result = await axios.get(geoCoding_URL);
        const lat = JSON.stringify(result.data[0].lat);
        const lon = JSON.stringify(result.data[0].lon);
        const units = "metric";
        const degrees = "°C"
        const speed = "km/h"
        const weather_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_Key}`
        const forecast_URL = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_Key}`
        try {
            const result = await axios.get(weather_URL);
            const name =  result.data.name;
            const temp =  Math.round(result.data.main.temp) + degrees;
            const tempMax = Math.round(result.data.main.temp_max) + degrees;
            const tempMin = Math.round(result.data.main.temp_min)+ degrees;
            const feelsLike = Math.round(result.data.main.feels_like) + degrees;
            const windSpeed = result.data.wind.speed + speed;
            const iconURL =  "https://openweathermap.org/img/wn/"+result.data.weather[0].icon+"@2x.png";
            const imageDesc = weatherDesc.getImageDesc(result.data.weather[0].icon);
            
            res.render("index.ejs", { name: name, temp: temp, tempMax: tempMax, tempMin: tempMin, 
                feelsLike: feelsLike, windSpeed: windSpeed, imageDesc: imageDesc, date: today, iconURL: iconURL, show: "visible"});
          } catch (error) {
              console.log(error.response.data);
              res.status(500);
          }

      } catch (error) {
          console.log(error.response.data);
          res.status(500);
      }
})

app.listen(port,()=>{
    console.log("Server started on port "+ port);
});








