const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.APP_PORT;
const key = process.env.APP_KEY;

app.get(`/key=${key}`, (_, res) => {
  return res.status(200).send({
    message: "kalibrr job portal api",
  });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
