const express = require("express");
const { getAllUser } = require("./controller");

const route = express();

route.get("/api/v1/super-admin/user", getAllUser);

module.exports = route;
