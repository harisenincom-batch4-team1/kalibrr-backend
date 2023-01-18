const express = require("express");
const { registerUser, loginUser } = require("./controller");

const route = express();

route.post("/api/v1/auth/user/register", registerUser);
route.post("/api/v1/auth/user/login", loginUser);

module.exports = route;
