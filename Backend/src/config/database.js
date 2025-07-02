const mongoose = require('mongoose')

const connectDb = async()=>{
    await mongoose.connect('mongodb+srv://NamasteDev:WKxf7x6cA9D1FuSB@namastenode.e4dsm.mongodb.net/EcomAssignment')
}

module.exports = connectDb;