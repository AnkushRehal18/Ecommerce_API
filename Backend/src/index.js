const express = require('express')

const app = express();

app.get("/",(req,res)=>{
    res.send("This is the first thing")
})

app.listen(3000,()=>{
    console.log("Connected running on port 3000")
})