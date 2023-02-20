const express = require("express");
const {
  registerUser,
  loginUser,
  registerCompany,
  loginCompany,
  sendOtpCompany,
  checkOtpCompany
} = require("./controller");

const route = express();

route.post("/auth/user/register", registerUser);
route.post("/auth/user/login", loginUser);
route.post("/auth/company/register", registerCompany);
route.post("/auth/company/login", loginCompany);

route.post("/auth/company/register/otp", sendOtpCompany);
route.post("/auth/company/register/otp-check", checkOtpCompany);

module.exports = route;
