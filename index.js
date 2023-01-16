const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.APP_PORT;

app.get(`/`, (_, res) => {
  return res.status(200).send({
    message: "kalibrr job portal api",
  });
});

const usersRoute = require("./src/api/user/router");

app.use(usersRoute);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
