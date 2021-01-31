const jwt = require("jsonwebtoken");
require("dotenv").config();
const path = require("path");

const HttpError = require("../models/http-error");

const checkAuth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return next(new HttpError("Authentication failed", 401));
      }

      const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
      req.userData = { user_id: decodedToken.user_id };
      next();
    } catch (err) {
      console.log(err);
      return next(new HttpError("Problem", 401));
    }
  } else {
    res.sendFile(path.resolve(__dirname, "../public", "index.html"));
  }
};

module.exports = checkAuth;
