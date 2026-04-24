const express = require("express")
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.use("/health", (req,res)=>{
    res.send({
        status: 200,
        message:"Server is running"
    })
})


module.exports = app