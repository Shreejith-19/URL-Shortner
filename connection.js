const mongoose = require("mongoose")
async function connectMongoDB(URL){
    mongoose.connect(URL)
        .then(()=>{
            console.log("conneced to DB.")
        })
        .catch((err)=>{
            console.log("Enable to connect to DB.")
        })
}
module.exports = connectMongoDB