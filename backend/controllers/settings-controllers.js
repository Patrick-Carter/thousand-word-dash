const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/User");

const HttpError = require("../models/http-error");

const changeEmail = (req, res, next) => {
  const validationErros = validationResult(req);

  if (!validationErros.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please try again.", 422);
  }

  const { email } = req.body;
  const { user_id } = req.userData;

  User.update(
    {
      email: email.toLowerCase(),
    },
    {
      where: { id: user_id },
    }
  )
    .then(() => {
      res.status(200).json({ message: "Email update successful!" });
    })
    .catch((err) => {
      return next(new HttpError("Could not update email, try again", 500));
    });
};

const changePassword = async (req, res, next) => {
  const validationErros = validationResult(req);

  if (!validationErros.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please try again.", 422);
  }

  const { password } = req.body;
  const { user_id } = req.userData;

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch {
    return next(new HttpError("Could not change password", 500));
  }

  User.update(
    {
      hashed_password: hashedPassword,
    },
    {
      where: { id: user_id },
    }
  )
    .then(() => {
      res.status(200).json({ message: "Password update successful!" });
    })
    .catch((err) => {
      return next(new HttpError("Could not update password, try again", 500));
    });
};

exports.changePassword = changePassword;
exports.changeEmail = changeEmail;
