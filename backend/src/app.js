const express = require("express");
const cors = require("cors");
const app = express();
const { origin } = require("./config/env");

// Routes
const expenseRoutes = require("./routes/expense.routes");
const errorHandler = require("./middlewares/error.middleware");

const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',')
  : []

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      callback(new Error('CORS blocked'))
    }
  })
)
app.use(express.json());

app.use("/health", (req, res) => {
  res.send({
    status: "ok",
    message: "Server is running",
  });
});
app.use("/api/v1/expenses", expenseRoutes);

app.use(errorHandler);

module.exports = app;
