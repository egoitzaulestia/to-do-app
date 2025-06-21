const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

const { dbConnection } = require("./config/db");

app.use(express.json());

dbConnection();

app.listen(PORT, () => {
  console.log(`Port running on port ${PORT}`);
});
