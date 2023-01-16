const express = require("express");
const { getAllUsers } = require("./controller");

const route = express();

route.get("/api/v1/users", getAllUsers);

module.exports = route;
