const express = require("express");
const https = require("https");
const bodyParser= require("body-parser");


const app= express();
app.use(bodyParser.urlencoded({extended: true}));
    app.get("/", function(req,res){
    res.sendFile(__dirname + "/index1.html");

      // const temp= "weatherData.main.temp";
          //   console.log(temp)5
        });
        app.post("/",function(req,res){
          console.log(req.body.cityName);
          const query= req.body.cityName;
          const apikey = "4c17058e125cbc037e3541d8a3ca648b";
          const unit= "metric";
          const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey +"&units="+unit;
          https.get(url, function(response){
          // 4c17058e125cbc037e3541d8a3ca648b
          // 4c17058e125cbc037e3541d8a3ca648b

              console.log(response.statusCode);
              response.on("data",function(data){
              const weatherData= JSON.parse(data);
              const temp= weatherData.main.temp;
              const description= weatherData.weather[0].description;
              const icon=weatherData.weather[0].icon;
              const imgURL="http://openweathermap.org/img/wn/"+ icon +"@2x.png";

              console.log(temp)
              res.write("<h1>Tempurature of "+ query   +" is " + temp + " celcius</h1>");

              res.write("<p> weather is "+ description +"</p>");

              res.write("<img src="+ imgURL +">");
              res.send();

          // res.send("server is up and running")
      });

        });

});
app.listen(3000, function(){
    console.log("server started on port 3000");
});
