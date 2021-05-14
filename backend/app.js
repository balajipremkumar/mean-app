const express =  require("express");
const bodyParser =  require("body-parser");
//const { ConsoleReporter } = require("jasmine");
const mongoose = require('mongoose');
const Post = require("./models/post");
const app = express();


mongoose.connect("mongodb://127.0.0.1:27017",{ useNewUrlParser: true , useUnifiedTopology:true})
.then(()=>{
  console.log("connected to database");
}).catch(()=>{
  console.log("connection failed");
}) 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));




app.use((req,res,next) => {
   res.setHeader("Access-Control-Allow-Origin","*");
   res.setHeader("Access-Control-Allow-Methods","GET","POST","PATCH","PUT","DELETE","OPTIONS");
   res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, content-Type, Accept, append,delete,entries,foreach,get,has,keys,set,values,Authorization");
   next()
});

app.post("/api/posts", (req, res, next)=> {
  const post = new Post({ 
    title: req.body.title,
    content:req.body.content
  })
  post.save()
  res.status(201).json({
    message: 'Post Added successfully'
  });
});

app.get('/api/posts',(req,res,next)=> { 
  Post.find().then(documents =>{
    res.status(200).json({
      message:'post fetched successfully',
      posts: documents
    });
  })
})

// app.delete("/api/posts/:id",(req, res, next)=> {
//  console.log(req.params.id);
//  res.status(200).json({ message: "Post deleted!" });
// })

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});



module.exports = app; 