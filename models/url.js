const mongoose = require("mongoose")
const urlSchema = mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    shortURL:{
        type:String,
        required:true,
        unique:true
    }
})

const URL = mongoose.model("url",urlSchema)
module.exports = URL