const API_KEY = '344ff42596604cecbdbe2be7e3e95827';
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=344ff42596604cecbdbe2be7e3e95827&units=metric"
const apiKey ="344ff42596604cecbdbe2be7e3e95827";
const express = require('express');
const bodyParser=require('body-parser');
const https = require('https');

const port=3001;
const app = express();
const homepage="/";
app.use(bodyParser.urlencoded({extended:true}));

app.get(homepage,function(req,res){
    res.sendFile(__dirname+"/index.html")
})
app.post(homepage,function(req,res){
    const city= req.body.cityname;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    https.get(url,(apiRes)=>{
        apiRes.on('data',data=>{
            const   weatherData = JSON.parse(data);
            const   Temperature = weatherData.main.temp,
                    Humidity =  weatherData.main.humidity,
                    Descripstion = weatherData.weather[0].description;
                    iconCode = weatherData.weather[0].icon;
            const weather_Icon_URL = ` http://openweathermap.org/img/wn/${iconCode}@2x.png`;
            //res.write(`<h2>Weather of ${city}</h2>`);
            res.write(`<h1>Weather of ${city}</h1>`);
            res.write(`<h3>To day is ${Descripstion} day </h3>`);
            res.write(`<h3>The average tempature :${Temperature} Celcius and the Humidity :${Humidity}</h3>`);
            res.write(`<img src='${weather_Icon_URL}'>`);
            res.send();
        })
    })
})


// app.get(homepage,function(req,res){
//     https.get(apiUrl, (apiRes) => {
//         apiRes.on("data",function(data){
//             const weatherData=JSON.parse(data);
//             console.log(weatherData);
//             const temp = weatherData.main.temp;
//             const description=weatherData.weather[0].description;
//             const icon =weatherData.weather[0].icon;
//             const iconUrl =` http://openweathermap.org/img/wn/${icon}@2x.png`
//             res.write(`<h1>The temperature of Ha Noi is ${temp} degree celcius</h1>`)
//             res.write(`<img src='${iconUrl}'>`);
//             res.send();
//         })
        
//     })
// })



app.listen(port,function(){
    console.log(`Server is running on port ${port}`);
})