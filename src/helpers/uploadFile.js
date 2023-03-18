const { Users, Companies } = require("../models");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const responseData = require("../helpers/responseData");
const pathUser = path.join("../../public/uploads/users/");
const pathCompany = path.join("../../public/uploads/companies/");

// get the file name from database
const resultFileNameUser = async (id) => {
  return await Users.findOne({
    where: { id },
    attributes: ["resume", "photo"],
  });
};

const resultFileNameCompany = async (id) => {
  return await Companies.findOne({
    where: { id },
    attributes: ["photo"],
  });
};

// storage resume user
const storageResumeUser = multer.diskStorage({
  // set the directory to save resume file
  destination: async (req, file, cb) => {
    const dir = path.join(
      __dirname,
      pathUser + req.globId.id + "/resume/"
    ); /* fungsi dari path join dirname untuk mengambil hasil dari posisi directory (string) */

    // check the directory
    if (!fs.existsSync(dir)) {
      /* mengecek directorynya ada atau tidak (boolean) */
      fs.mkdirSync(dir, { recursive: true }); /* membuat directory otomatis */
      return cb(null, dir);
    }

    cb(null, dir);
  },

  // set filename using uuid (safety)
  filename: (req, file, cb) => {
    const fileName = path.basename(
      uuidv4(file.originalname),
      path.extname(file.originalname)
    );
    cb(null, fileName + path.extname(file.originalname));
  },
});

// storage photo profile user
const storagePhotoUser = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dir = path.join(__dirname, pathUser + req.globId.id + "/photo/");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      return cb(null, dir);
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const fileName = path.basename(
      uuidv4(file.originalname),
      path.extname(file.originalname)
    );
    cb(null, fileName + path.extname(file.originalname));
  },
});

// upload resume user
const uploadResumeUser = multer({
  storage: storageResumeUser,
  limits: {
    fileSize: 1000000 /* 1 MB */,
  },
  // filter file
  fileFilter: (req, file, cb) => {
    const extFile = path.extname(file.originalname);
    const extFilter = [".pdf", ".PDF"];

    // if (extFile !== extFilter) {

    // }

    if (!extFilter.includes(extFile)) {
      return cb(new Error("Resume yang diinput harus berbentuk PDF"));
    }

    cb(null, true);
  },
}).single("resume");

// upload photo profile user
const uploadPhotoUser = multer({
  storage: storagePhotoUser,
  limits: {
    fileSize: 3000000 /* 3 MB */,
  },
  fileFilter: (req, file, cb) => {
    const extFile = path.extname(file.originalname);
    const extFilter = [".jpg", ".jpeg", ".png", ".JPG", ".PNG", ".JPEG"];

    if (!extFilter.includes(extFile)) {
      return cb(
        new Error(
          "Foto Profile yang diinput harus berbentuk JPG atau JPEG atau PNG"
        )
      );
    }

    cb(null, true);
  },
}).single("photo");

// upload user handler
const userUploadHandler = (req, res, next) => {
  if (req.route.path == "/user/resume") {
    uploadResumeUser(req, res, (error) => {
      if (error) {
        return res
          .status(400)
          .send(responseData(400, null, error?.message, null));
      }
      next();
    });
  } else if (req.route.path == "/user/photo") {
    uploadPhotoUser(req, res, (error) => {
      if (error) {
        return res
          .status(400)
          .send(responseData(400, null, error?.message, null));
      }
      next();
    });
  }
};

// remove previous resume user
const removeFileResumeUser = async (req, res, next) => {
  const resultFile = await resultFileNameUser(req.globId.id);
  
  const resultDir = path.join(__dirname, pathUser);
  const resultFilePath = resultFile.dataValues?.resume?.replace(
    /\//g,
    "\\"
  ); 
  
  /* mengganti tanda "/" di database menjadi "\" */
  if (fs.existsSync(resultDir + resultFilePath)) {
    fs.unlinkSync(resultDir + resultFilePath);
  }

  next();
};

// remove previous resume user
const removeFilePhotoUser = async (req, res, next) => {
  const resultFile = await resultFileNameUser(req.globId.id);
  const resultDir = path.join(__dirname, pathUser);
  const resultFilePath = resultFile.dataValues.photo?.replace(/\//g, "\\");
  if (fs.existsSync(resultDir + resultFilePath)) {
    fs.unlinkSync(resultDir + resultFilePath);
  }

  next();
};

// storage photo profile company
const storagePhotoCompany = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dir = path.join(__dirname, pathCompany + req.globId.id + "/photo/");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      return cb(null, dir);
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const fileName = path.basename(
      uuidv4(file.originalname),
      path.extname(file.originalname)
    );
    cb(null, fileName + path.extname(file.originalname));
  },
});

// upload photo profile user
const uploadPhotoCompany = multer({
  storage: storagePhotoCompany,
  limits: {
    fileSize: 3000000 /* 3 MB */,
  },
  fileFilter: (req, file, cb) => {
    const extFile = path.extname(file.originalname);
    const extFilter = [".jpg", ".jpeg", ".png", ".JPG", ".PNG", ".JPEG"];

    if (!extFilter.includes(extFile)) {
      return cb(
        new Error(
          "Foto Profile yang diinput harus berbentuk JPG atau JPEG atau PNG"
        )
      );
    }

    cb(null, true);
  },
}).single("photo");

// upload company handler
const companyUploadHandler = (req, res, next) => {
  uploadPhotoCompany(req, res, (error) => {
    if (error) {
      return res
        .status(400)
        .send(responseData(400, null, error?.message, null));
    }
    next();
  });
};

const removeFilePhotoCompany = async (req, res, next) => {
  const resultFile = await resultFileNameCompany(req.globId.id);
  const resultDir = path.join(__dirname, pathCompany);
  const resultFilePath = resultFile.dataValues.photo?.replace(/\//g, "\\");

  if (fs.existsSync(resultDir + resultFilePath)) {
    fs.unlinkSync(resultDir + resultFilePath);
  }

  next();
};

module.exports = {
  userUploadHandler,
  companyUploadHandler,
  removeFileResumeUser,
  removeFilePhotoUser,
  removeFilePhotoCompany,
};
