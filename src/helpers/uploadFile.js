const { Users } = require("../models");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
// const responseData = require("../helpers/responseData");

// get the file name from database
const resultFileNameUser = async (id) => {
  return await Users.findOne({
    where: { id },
    attributes: ['resume', 'photo'],
  });
}

// const resultFileNameCompany = async (name) => {
//   return await Companies.findOne({
//     where: { name },
//     attributes: ['photo'],
//   });
// }

// storage resume user
const storageResumeUser = multer.diskStorage({
  // set the directory to save resume file
  destination: async (req, file, cb) => { 
    const dir = path.join(__dirname, "../../public/uploads/users/" + req.globId.id + "/resume/"); /* fungsi dari path join dirname untuk mengambil hasil dari posisi directory (string) */

    req.dir = dir;

    // check the directory
    if (!fs.existsSync(dir)) { /* mengecek directorynya ada atau tidak (boolean) */
      fs.mkdirSync(dir, { recursive: true }); /* membuat directory otomatis */
      return cb(null, dir);
    }

    cb(null, dir);
  },

  // set filename using uuid (safety)
  filename: (req, file, cb) => {
    // console.log(file);
    const fileName = path.basename(uuidv4(file.originalname), path.extname(file.originalname))
    cb(null, fileName + path.extname(file.originalname));
  }
});

// storage photo profile user
const storagePhotoUser = multer.diskStorage({
  destination: async (req, file, cb) => { 
    const dir = path.join(__dirname, "../../public/uploads/users/" + req.globId.id + "/photo/");

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

// upload resume user
const uploadResumeUser = multer({
  storage: storageResumeUser,
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

// upload photo profile user
const uploadPhotoUser = multer({
  storage: storagePhotoUser,
  limits: {
    fileSize: 3000000 /* 3 MB */
  },
  fileFilter: (req, file, cb) => {
    const extFile = path.extname(file.originalname);
    const extFilter = ['.jpg', '.jpeg', '.png'];

    if (!extFilter.includes(extFile)) {
      return cb(new Error("Foto Profile yang diinput harus berbentuk JPG atau JPEG atau PNG"));
    }

    req.uploadType = "photo";
    cb(null, true);
  }
}).single("photo");

// const uploadResumeUserHandler = uploadResumeUser(req, res, (error) => {
//   if (error instanceof multer.MulterError) {
//     return res.status(400).send(responseData(400, null, error?.message, null));
//   }

//   next();
// });

// // file size user handler
// const fileSizeResumeUserHandler = async(error, req, res, next) => {
//   if (error) {
//     return res.status(400).send(responseData(400, null, error?.message, null));
//   }

//   next();
// }

// remove previous resume user
const removeFileResumeUser = async(req, res, next) => {
  const resultFile = await resultFileNameUser(req.globId.id);
  const resultDir = req.dir;
  // console.log('hasil :',resultFile);
  // console.log('hasil dir :',req.dir);
  if (fs.existsSync(resultDir + resultFile.dataValues.resume)) {
    fs.unlinkSync(resultDir + resultFile.dataValues.resume);
  }

  next();
}

// // file size user handler
// const fileSizePhotoUserHandler = async(error, req, res, next) => {
//   if (error) {
//     return res.status(400).send(responseData(400, null, error?.message, null));
//   }

//   next();
// }

// remove previous resume user
const removeFilePhotoUser = async(req, res, next) => {
  const resultFile = await resultFileNameUser(req.globId.id);
  const resultDir = req.dir;
  // console.log('hasil :',resultFile);
  // console.log('hasil dir :',req.dir);
  if (fs.existsSync(resultDir + resultFile.dataValues.photo)) {
    fs.unlinkSync(resultDir + resultFile.dataValues.photo);
  }

  next();
}

// storage photo profile company
const storagePhotoCompany = multer.diskStorage({
  destination: async (req, file, cb) => { 
    const dir = path.join(__dirname, "../../public/uploads/companys/" + req.globId.name + "/photo/");

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

// upload photo profile user
const uploadPhotoCompany = multer({
  storage: storagePhotoCompany,
  limits: {
    fileSize: 3000000 /* 3 MB */
  },
  fileFilter: (req, file, cb) => {
    const extFile = path.extname(file.originalname);
    const extFilter = ['.jpg', '.jpeg', '.png'];

    if (!extFilter.includes(extFile)) {
      return cb(new Error("Foto Profile yang diinput harus berbentuk JPG atau JPEG atau PNG"));
    }

    req.uploadType = "photo";
    cb(null, true);
  }
}).single("photo");

// const removeFilePhotoCompany = async(req, res, next) => {
//   const resultFile = req.body.name;
//   const resultDir = req.dir;
//   console.log('hasil: ' + resultFile);
//   console.log('hasil dir :' + req.dir);
//   if (fs.existsSync(resultDir + resultFile.dataValues.photo)) {
//     fs.unlinkSync(resultDir + resultFile.dataValues.photo);
//   }

//   next();
// }

module.exports = {
  uploadResumeUser,
  uploadPhotoUser,
  uploadPhotoCompany,
  // fileSizeResumeUserHandler,
  // uploadResumeUserHandler,
  removeFileResumeUser,
  // fileSizePhotoUserHandler,
  removeFilePhotoUser,
  // removeFilePhotoCompany
}