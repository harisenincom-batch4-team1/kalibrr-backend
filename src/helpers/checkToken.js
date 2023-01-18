const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkToken = (req) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  const secretKey = process.env.JWT_TOKEN;
  const { id } = jwt.verify(token, secretKey);

  return id;
};

module.exports = checkToken;
