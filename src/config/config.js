const dotenv = require("dotenv");
dotenv.config();

const config = {
  development: {
    username: "root",
    password: process.env.DEVELOPMENT_MYSQL_PASSWORD,
    database: process.env.DEVELOPMENT_MYSQL_DATABASE,
    host: process.env.DEVELOPMENT_MYSQL_HOST,
    dialect: "mysql",
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: '+07:00',
  },
  production: {
    username: process.env.PRODUCTION_MYSQL_USERNAME,
    password: process.env.PRODUCTION_MYSQL_PASSWORD,
    database: process.env.PRODUCTION_MYSQL_DATABASE,
    host: process.env.PRODUCTION_MYSQL_HOST,
    dialect: "mysql",
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: '+07:00',
  },
};

module.exports = config;
