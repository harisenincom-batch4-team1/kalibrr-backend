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
const { Users } = require("../../models");

// path
const path = require("path");

// fs
const fs = require("fs")

// uuid
const { v4: uuidv4 } = require("uuid");

// get the file name from database
const resultFileName = async(id) => {
  return await Users.findOne({
    where: { id },
    attributes: ['resume', 'photo'],
  });
}

// multer
const multer = require("multer");
const storageResume = multer.diskStorage({
  // set the directory to save resume file
  destination: async (req, file, cb) => { 
    const dir = path.join(__dirname, "../../../public/uploads/users/" + req.userId.id + "/resume/"); /* fungsi dari path join dirname untuk mengambil hasil dari posisi directory (string) */

    req.dir = dir;

    // check the directory
    if (!fs.existsSync(dir)) { /* mengecek directorynya ada atau tidak (boolean) */
      fs.mkdirSync(dir, { recursive: true }); /* membuat directory otomatis */
      return cb(null, dir);
    }
    // else if (!fs.existsSync(dir + resultFileName.dataValues.resume)) { /* cek apakah file masih ada atau tidak */ 
    //   return cb(null, dir);
    // }
    // else if (fs.existsSync(dir + resultFileName.dataValues.resume)) {
    //   fs.unlinkSync(dir + resultFileName.dataValues.resume); /* hapus file sebelumnya */
    //   cb(null, dir);
    // }

    cb(null, dir);
  },

  // set filename using uuid (safety)
  filename: (req, file, cb) => {
    // console.log(file);
    const fileName = path.basename(uuidv4(file.originalname), path.extname(file.originalname))
    cb(null, fileName + path.extname(file.originalname));
  }
});

const storagePhoto = multer.diskStorage({
  destination: async (req, file, cb) => { 
    const dir = path.join(__dirname, "../../../public/uploads/users/" + req.userId.id + "/photo/");

    req.dir = dir;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      return cb(null, dir);
    }

    // console.log(resultFileName.dataValues.photo);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // console.log(file);
    const fileName = path.basename(uuidv4(file.originalname), path.extname(file.originalname))
    cb(null, fileName + path.extname(file.originalname));
  }
});

const fileSizeResumeHandler = (error, req, res, next) => {
  if (error) {
    return res.status(400).send(responseData(400, null, error?.message, null));
  }

  next();
  fs.unlinkSync(dir + resultFileName.dataValues.resume);
}

const fileSizePhotoHandler = (error, req, res, next) => {
  if (error) {
    return res.status(400).send(responseData(400, null, error?.message, null));
  }

  next();
  fs.unlinkSync(dir + resultFileName.dataValues.photo);
}

const uploadResume = multer({
    storage: storageResume,
    limits: {
      fileSize: 1000000 /* 1 MB */
    },
    // filter file
    fileFilter: (req, file, cb) => {
      const extFile = path.extname(file.originalname);
      const extFilter = '.pdf';

      if (extFile !== extFilter) {
        return cb(new Error("Resume yang diinput harus berbentuk PDF"));
      }

      req.uploadType = "resume";
      cb(null, true);
    }
}).single("resume");

const uploadPhoto = multer({
  storage: storagePhoto,
  limits: {
    fileSize: 3000000 /* 3 MB */
  },
  fileFilter: (req, file, cb) => {
    const extFile = path.extname(file.originalname);
    const extFilter = ['.jpg', '.jpeg', '.png'];

    if (!extFilter.includes(extFile)) {
      return cb(new Error("Foto Profile yang diinput harus berbentuk JPG atau JPEG atau PNG"))
    }

    req.uploadType = "photo";
    cb(null, true);
  }
}).single("photo");

const route = express();

route.get("/user", auth, getDetailUser);
route.put("/user", auth, updateUser);
route.put("/user-email", auth, updateEmailUser);
route.put("/user-password", auth, updatePasswordUser);
route.delete("/user", auth, deleteUser);

route.get("/user/resume", auth, getAllResume); /* id */
// route.get("/user/resume/:id", auth, getOneResume);
route.put("/user/resume", auth, uploadResume, fileSizeResumeHandler, createResume);
// route.delete("/user/resume/:id", auth, deleteResume);

route.get("/user/photo", auth, getAllPhoto);
route.put("/user/photo", auth, uploadPhoto, fileSizeResumeHandler, putPhoto);

route.get("/user/apply", auth, getApply);
route.post("/user/apply", auth, apply);

module.exports = route;
