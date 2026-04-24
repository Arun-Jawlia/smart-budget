const app = require('./app')
const dotenv = require("dotenv")
const { port } = require('./config/env')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

