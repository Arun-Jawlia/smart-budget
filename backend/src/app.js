const express = require("express")
const cors = require('cors')
const app = express()

// Routes
const expenseRoutes = require('./routes/expense.routes')
const errorHandler = require('./middlewares/error.middleware')


app.use(cors())
app.use(express.json())

app.use("/health", (req,res)=>{
    res.send({
        status: 200,
        message:"Server is running"
    })
})
app.use('/api/v1/expenses', expenseRoutes)


app.use(errorHandler)

module.exports = app