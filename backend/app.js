const express =  require("express");
const bodyParser =  require("body-parser");
//const { ConsoleReporter } = require("jasmine");
const app = express();
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use((req,res,next)=> {
   res.setHeader("Access-control-Allow-Origin","*");
   res.setHeader("Access-control-Allow-Headers","Origin, X-Requested-With, content-Type, Accept");
   res.setHeader("Access-control-Allow-Methods","GET","POST","PATCH","PUT","DELETE","OPTIONS");
   next()
});

app.post("/api/posts", (req, res, next)=> {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post Added successfully'
  });
});

app.get('/api/posts',(req,res,next)=> { 
  const posts = [{
    id:'aas12323we',
    title: 'First server-side post',
    content: 'static data from server'
  }]
  
  return res.status(200).json({
    message:'post fetched successfully',
    posts:posts
  });
})

module.exports = app; 