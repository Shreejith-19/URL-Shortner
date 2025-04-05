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
    },
    history:[{
        visits:{
        type:String,
        },
    }],
    clicks:{
        type:Number,
    }
},{timestamps:true})

const URL = mongoose.model("url",urlSchema)
module.exports = URL