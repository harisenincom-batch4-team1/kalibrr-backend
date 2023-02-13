const express = require("express");
const auth = require("../../middlewares/auth");
const {
  getDetailUser,
  deleteUser,
  updateUser,
  updateEmailUser,
  updatePasswordUser,
  createResume,
  deleteResume,
  getAllResume,
  // getOneResume,
  getApply,
  apply,
} = require("./controller");

// path
const path = require("path");

// fs
const fs = require("fs")

// uuid
const { v4: uuidv4 } = require("uuid");

// multer
const multer = require("multer");
const { create } = require("domain");
const storage = multer.diskStorage({
  // set the directory to save resume file
  destination: (req, file, cb) => { 
    const dir = path.join(__dirname, "../../../public/uploads/users/"); /* fungsi dari path join dirname untuk mengambil hasil dari posisi directory (string) */
    // console.log(dir); 
    if (!fs.existsSync(dir)) { /* mengecek directorynya ada atau tidak */
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

const upload = multer({
    storage: storage
}).single("cv");

const route = express();

route.get("/user", auth, getDetailUser);
route.put("/user", auth, updateUser);
route.put("/user-email", auth, updateEmailUser);
route.put("/user-password", auth, updatePasswordUser);
route.delete("/user", auth, deleteUser);

route.get("/user/resume", auth, getAllResume);
// route.get("/user/resume/:id", auth, getOneResume);
route.post("/user/resume", auth, upload, createResume);
route.delete("/user/resume/:id", auth, deleteResume);

route.get("/user/apply", auth, getApply);
route.post("/user/apply", auth, apply);

module.exports = route;
