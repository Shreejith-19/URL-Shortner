const express = require("express")
const connectMongoDB = require("./connection.js")
const URL = require("./models/url.js")

const port = 4000
const app = express()
const MongoURL = "mongodb://127.0.0.1:27017/short-url"

connectMongoDB(MongoURL)
app.listen(port,()=>{
    console.log(`Server listening at port:${port}`)
})