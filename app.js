const API_KEY = '344ff42596604cecbdbe2be7e3e95827';
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=344ff42596604cecbdbe2be7e3e95827&units=metric"

const express = require('express');
const bodyParser=require('body-parser');
const https = require('https');

const port=3001;
const app = express();
const homepage="/";
app.use(bodyParser.urlencoded({extended:true}));

app.get(homepage,function(req,res){
    https.get(apiUrl, (apiRes) => {
        apiRes.on("data",function(data){
            const weatherData=JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const description=weatherData.weather[0].description;
            const icon =weatherData.weather[0].icon;
            const iconUrl =` http://openweathermap.org/img/wn/${icon}@2x.png`
            res.write(`<h1>The temperature of Ha Noi is ${temp} degree celcius</h1>`)
            res.write(`<img src='${iconUrl}'>`);
            res.send();
        })
        
    })
})



app.listen(port,function(){
    console.log(`Server is running on port ${port}`);
})