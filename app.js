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
        console.log(apiRes);
        
    })
    res.send("hello from Hompage");
})



app.listen(port,function(){
    console.log(`Server is running on port ${port}`);
})