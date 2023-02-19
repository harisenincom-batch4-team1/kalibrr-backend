const express = require("express");
const auth = require("../../middlewares/auth");
const responseData = require("../../helpers/responseData");
const {
  getDetailCompany,
  deleteCompany,
  updateCompany,
  updateEmailCompany,
  updatePasswordCompany,
  getAllJob,
  getOneJob,
  createJob,
  deleteJob,
  updateJob,
  getUserApply,
  updateApplyStatus
} = require("./controller");
const {
  uploadPhotoCompany,
  removeFilePhotoCompany
} = require("../../helpers/uploadFile");

const route = express();

route.get("/company", auth, getDetailCompany);
route.put("/company", auth, updateCompany);
route.put("/company-email", auth, updateEmailCompany);
route.put("/company-password", auth, updatePasswordCompany);
route.delete("/company", auth, deleteCompany);

route.get("/company-job", auth, getAllJob);
route.get("/company-job/:id", auth, getOneJob);
route.post("/company-job", auth, createJob);
route.delete("/company-job/:id", auth, deleteJob);
route.put("/company-job/:id", auth, updateJob);

route.get("/company-apply", auth, getUserApply);
route.put("/company-apply/:id", auth, updateApplyStatus);

module.exports = route;
