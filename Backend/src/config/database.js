const mongoose = require('mongoose')

const connectDb = async()=>{
    await mongoose.connect(process.env.DB_SECRET_KEY)
}

module.exports = connectDb;