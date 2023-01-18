const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.APP_PORT;

app.get("/", (_, res) => {
  return res.status(200).send({
    message: "kalibrr job portal api",
  });
});

const superAdmin = require("./src/api/super_admin/router");
const UserRoute = require("./src/api/user/router");
const applicantRoute = require("./src/api/applicant/router");
const authRoute = require("./src/api/auth/router");

app.use(superAdmin);
app.use(UserRoute);
app.use(applicantRoute);
app.use(authRoute);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
