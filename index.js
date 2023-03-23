const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const port = process.env.APP_PORT || 9000;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/static", express.static("public"));

const v1 = "/api/v1";
const publicRoute = require("./src/api/public/router");
const userRoute = require("./src/api/user/router");
const companyRoute = require("./src/api/company/router");
const authRoute = require("./src/api/auth/router");

app.get("/", (_, res) => {
  return res.status(200).send({
    message: "kalibrr job portal api",
  });
});

app.use(v1, publicRoute);
app.use(v1, authRoute);

app.use(v1, userRoute);
app.use(v1, companyRoute);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
