const mongoose =require('mongoose')

const userSchema = new mongoose.Schema({
    bookname: {
        type : String,
        required: true
    },
    authorname: {
        type : String,
        required: true
    },
    date: {
        type : Date,
        required: true
    },
    price: {
        type : Number,
        required: true
    },
    bookimage:{
        type: String,
        required: true
    },
    link:{
        type : String,
        required : true
    }
})

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;