const mongoose = require("mongoose");
const { mongodb_uri } = require("./env")

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongodb_uri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;