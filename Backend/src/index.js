const connectDb = require('./config/database')
const express = require('express')
const cookieParser = require("cookie-parser");
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const cors = require('cors');

const app = express();
require('dotenv').config();
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
app.use(express.json());
app.use(cookieParser())


app.use("/",authRouter);
app.use("/",productRouter);

connectDb().then(()=>{
    console.log("Connected to database successfully");
    app.listen(3000,()=>{
        console.log("Server is running on port 3000")
    })
}).catch((err)=>{
    console.log("Database Cannot be connected",err)
});