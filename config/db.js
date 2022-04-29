const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: process.env.DB_NAME });

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log(`${process.env.DB_NAME} DataBase Connected`);
});

module.exports = db;
