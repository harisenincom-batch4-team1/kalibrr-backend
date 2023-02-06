const express = require("express");
const {
  getAllUser,
  getCompanyDetail,
  getAllJob,
  getOneJob,
} = require("./controller");

const route = express();

route.get("/user", getAllUser);
route.get("/job", getAllJob);
route.get("/job/:id", getOneJob);
route.get("/company/:id", getCompanyDetail);

module.exports = route;
