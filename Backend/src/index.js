const connectDb = require('./config/database')
const authRouter = require('./routes/auth');
const express = require('express')

const app = express();
app.use(express.json());
app.use("/",authRouter);

connectDb().then(()=>{
    console.log("Connected to database successfully");
    app.listen(3000,()=>{
        console.log("Server is running on port 3000")
    })
}).catch((err)=>{
    console.log("Database Cannot be connected",err)
});