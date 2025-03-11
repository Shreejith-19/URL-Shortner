const express = require("express")
const port = 4000
const app = express()

app.listen(port,()=>{
    console.log(`Server listening at port:${port}`)
})