const express = require("express");
const auth = require("../../middlewares/auth");
const { getAllJob, getOneJob, createJob, deleteJob } = require("./controller");

const route = express();

route.get("/company-job", auth, getAllJob);
route.get("/company-job/:id", auth, getOneJob);
route.post("/company-job", auth, createJob);
route.delete("/company-job/:id", auth, deleteJob);

module.exports = route;
