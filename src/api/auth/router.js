const express = require("express");
const { registerUser, loginUser, registerCompany, loginCompany } = require("./controller");

const route = express();

route.post("/auth/user/register", registerUser);
route.post("/auth/user/login", loginUser);
route.post("/auth/company/register", registerCompany);
route.post("/auth/company/login", loginCompany);

module.exports = route;
