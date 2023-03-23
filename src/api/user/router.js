const express = require("express");
const auth = require("../../middlewares/auth");
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
  removeFileResumeUser,
  removeFilePhotoUser,
  userUploadHandler,
  removeDir
} = require("../../helpers/uploadFile");

const route = express();

route.get("/user", auth, getDetailUser);
route.put("/user", auth, updateUser);
route.put("/user-email", auth, updateEmailUser);
route.put("/user-password", auth, updatePasswordUser);
route.delete("/user", auth, removeDir, deleteUser);

route.get("/user/resume", auth, getAllResume); /* id */
// route.get("/user/resume/:id", auth, getOneResume);
route.put("/user/resume", auth, userUploadHandler, removeFileResumeUser, createResume);
// route.delete("/user/resume/:id", auth, deleteResume);

route.get("/user/photo", auth, getAllPhoto);
route.put("/user/photo", auth, userUploadHandler, removeFilePhotoUser, putPhoto);

route.get("/user/apply", auth, getApply);
route.post("/user/apply", auth, apply);

module.exports = route;