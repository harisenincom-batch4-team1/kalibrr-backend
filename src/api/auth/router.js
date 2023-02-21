const express = require("express");
const { registerUser, loginUser, registerCompany, loginCompany } = require("./controller");
const { uploadPhotoCompany } = require("../../helpers/uploadFile");
const responseData = require("../../helpers/responseData");

const route = express();

route.post("/auth/user/register", registerUser);
route.post("/auth/user/login", loginUser);
route.post("/auth/company/register", (req, res, next) => {
    uploadPhotoCompany(req, res, (error) => {
        if (error) {
            return res.status(400).send(responseData(400, null, error?.message, null));
        }

        next();
    });
}, registerCompany);
route.post("/auth/company/login", loginCompany);

module.exports = route;
