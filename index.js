const express = require("express")
const connectMongoDB = require("./connection.js")
const urlRouter = require("./routes/url.js")
const app = express()
const port = 4000

app.use(express.json())// to put raw data in req.body
app.use("/url",urlRouter)

const URL = require("./models/url.js")

const MongoURL = "mongodb://127.0.0.1:27017/short-url"

connectMongoDB(MongoURL)
app.listen(port,()=>{
    console.log(`Server listening at port:${port}`)
})