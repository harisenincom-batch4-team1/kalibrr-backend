const express = require("express");
const auth = require("../../middlewares/auth");
const { getAllApplicant, getOneApplicant, createApplicant } = require("./controller");

const route = express();

route.get("/api/v1/applicant", auth, getAllApplicant);
route.get("/api/v1/applicant/:id", auth, getOneApplicant);
route.post("/api/v1/applicant", auth, createApplicant);

module.exports = route;