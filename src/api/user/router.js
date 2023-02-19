const express = require("express");
const auth = require("../../middlewares/auth");
const responseData = require("../../helpers/responseData");
const {
  getDetailUser,
  deleteUser,
  updateUser,
  updateEmailUser,
  updatePasswordUser,
  createResume,
  // deleteResume,
  getAllResume,
  // getOneResume,
  putPhoto,
  getAllPhoto,
  getApply,
  apply,
} = require("./controller");
const {
  // uploadResumeUserHandler,
  uploadResumeUser,
  uploadPhotoUser,
  // fileSizeResumeUserHandler,
  removeFileResumeUser,
  // fileSizePhotoUserHandler,
  removeFilePhotoUser
} = require("../../helpers/uploadFile");

const route = express();

route.get("/user", auth, getDetailUser);
route.put("/user", auth, updateUser);
route.put("/user-email", auth, updateEmailUser);
route.put("/user-password", auth, updatePasswordUser);
route.delete("/user", auth, deleteUser);

route.get("/user/resume", auth, getAllResume); /* id */
// route.get("/user/resume/:id", auth, getOneResume);
  removeFileResumeUser,
route.put("/user/resume", auth, (req, res, next) => {
  uploadResumeUser(req, res, (error) => {
    if (error) {
      return res.status(400).send(responseData(400, null, error?.message, null));
    }
    // console.log(error);
    next();
  });
}, removeFileResumeUser, createResume);
// route.delete("/user/resume/:id", auth, deleteResume);

route.get("/user/photo", auth, getAllPhoto);
route.put("/user/photo", auth, uploadPhotoUser, removeFilePhotoUser, putPhoto);

route.get("/user/apply", auth, getApply);
route.post("/user/apply", auth, apply);

module.exports = route;
