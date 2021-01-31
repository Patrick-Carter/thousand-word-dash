const express = require("express");
const { check } = require("express-validator");

const userControllers = require("../controllers/user-controllers");

const router = express.Router();

router.post("/login", userControllers.loginUser);

router.post(
  "/signup",
  [check("email").isEmail(), check("password").isLength({ min: 5 })],
  userControllers.signupUser
);

module.exports = router;
