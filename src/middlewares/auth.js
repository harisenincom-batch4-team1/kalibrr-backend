const jwt = require("jsonwebtoken");
const responseData = require("../helpers/responseData");
require("dotenv").config();

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).send(responseData(401, "Invalid Token", null, null));
    }

    const secretKey = process.env.JWT_TOKEN;
    const verify = jwt.verify(token, secretKey);

    if (!verify) {
      return res.status(401).send(responseData(401, "Unauthorized", null, null));
    }

    const decodeToken = jwt.decode(token);
    // console.log(decodeToken);
    
    req.globId = decodeToken;

    next();
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

module.exports = auth;
