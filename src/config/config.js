const dotenv = require("dotenv");
dotenv.config();

const config = {
  development: {
    username: "root",
    password: process.env.DEVELOPMENT_MYSQL_PASSWORD,
    database: "kalibrr",
    host: process.env.DEVELOPMENT_MYSQL_HOST,
    dialect: "mysql",
  },
  production: {
    username: process.env.PRODUCTION_MYSQL_USERNAME,
    password: process.env.PRODUCTION_MYSQL_PASSWORD,
    database: process.env.PRODUCTION_MYSQL_DATABASE,
    host: process.env.PRODUCTION_MYSQL_HOST,
    dialect: "mysql",
  },
};

module.exports = config;
