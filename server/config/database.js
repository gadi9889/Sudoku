const mongoose = require("mongoose");
require('dotenv').config()

const { MONGODB_URI } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};