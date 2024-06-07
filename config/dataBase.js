const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://nikeeparihar695:12345@cluster0.ycjxb4c.mongodb.net/Bookstrore")

db = mongoose.connection;


// require('dotenv').config()

// let url = process.env.DB_URL

// mongoose.connect(url)

// const db = mongoose.connection;

db.on('connected', (err)=>{
    if(err){
        console.log("Database not connected")
    }else{
        console.log("Database connected")
    }
});

module.exports = db;

