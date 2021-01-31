const express = require("express");
const { check } = require("express-validator");

const settingsControllers = require("../controllers/settings-controllers");

const router = express.Router();

router.post(
  "/changeemail",
  check("email").isEmail(),
  settingsControllers.changeEmail
);

router.post(
  "/changepassword",
  check("password").isLength({ min: 5 }),
  settingsControllers.changePassword
);

module.exports = router;
