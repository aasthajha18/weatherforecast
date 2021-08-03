require('dotenv').config();

const express= require("express");
const https= require("https");
const bodyParser= require("body-parser");
 const app= express();
 app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){
res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){


const query=req.body.cityName;


  const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" +process.env.APIKEY +"&units=metric";
https.get(url, function(response)
{
  //console.log(response);
response.on("data",function(data)
{
  const weatherData= JSON.parse(data);
  //console.log(data);
  console.log(weatherData);
  const temp=weatherData.main.temp;
  console.log(temp);
  const description= weatherData.weather[0].description;
  console.log(description);
  const icon= weatherData.weather[0].icon;
  const imageURL="http://openweathermap.org/img/wn/" + icon + "@2x.png";

res.write("<p>The weather description is : " + description+ "</p>")
  res.write("<h1>The temperature in " +query+" is "+temp+"degree Celsius</h1>");
res.write("<img src=" +imageURL +">");
res.send();
});

});
});















 app.listen(3000,function(){
   console.log("Server active at port 3000");
 })
