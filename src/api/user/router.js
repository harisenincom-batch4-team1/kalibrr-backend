const express = require("express");
const auth = require("../../middlewares/auth");
const {
  getDetailUser,
  deleteUser,
  updateUser,
  updateEmailUser,
  updatePasswordUser,
  createResume,
  deleteResume,
  getAllResume,
  getOneResume,
  getApply,
  apply,
} = require("./controller");

const route = express();

route.get("/user", auth, getDetailUser);
route.put("/user", auth, updateUser);
route.put("/user-email", auth, updateEmailUser);
route.put("/user-password", auth, updatePasswordUser);
route.delete("/user", auth, deleteUser);

route.get("/user/resume", auth, getAllResume);
route.get("/user/resume/:id", auth, getOneResume);
route.post("/user/resume", auth, createResume);
route.delete("/user/resume/:id", auth, deleteResume);

route.get("/user/apply", auth, getApply);
route.post("/user/apply", auth, apply);

module.exports = route;
