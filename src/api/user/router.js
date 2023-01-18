const express = require("express");
const auth = require("../../middlewares/auth");
const { deleteUser, updateUser, updateEmailUser, updatePasswordUser } = require("./controller");

const route = express();

route.delete("/api/v1/user", auth, deleteUser);
route.put("/api/v1/user", auth, updateUser);
route.put("/api/v1/user-email", auth, updateEmailUser);
route.put("/api/v1/user-password", auth, updatePasswordUser);

module.exports = route;
