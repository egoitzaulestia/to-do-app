const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = procress.env.MONGO_URI;

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.error(error);
    throw new Error("Error while initializing the database");
  }
};

module.exports = { dbConnection };
