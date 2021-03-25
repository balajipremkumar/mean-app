const express =  require("express");
const { ConsoleReporter } = require("jasmine");
const app = express();



app.use((req,res,next)=>{
   console.log("hello from middleware");
   next();
});


app.use((req,res,next)=>{
  res.send("hello from express");
})

module.exports = app; 