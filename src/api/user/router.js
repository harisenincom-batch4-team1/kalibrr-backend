const express = require("express");
const auth = require("../../middlewares/auth");
const { deleteUser } = require("./controller");

const route = express();

route.delete("/api/v1/user", auth, deleteUser);

module.exports = route;
