const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");
const EnglishVocab = require("../models/EnglishVocab");
const SpanishVocab = require("../models/SpanishVocab");

const HttpError = require("../models/http-error");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  let user;

  try {
    user = await User.findOne({
      attributes: ["id", "email", "hashed_password"],
      where: {
        email: email.toLowerCase(),
      },
    });

    if (user === null) {
      return next(new HttpError("invalid user credentials", 401));
    }
  } catch (err) {
    return next(new HttpError("invalid user credentials", 401));
  }

  if (user.email.toLowerCase() === email.toLowerCase()) {
    let isValidPassword = false;

    try {
      isValidPassword = await bcrypt.compare(password, user.hashed_password);
    } catch (err) {
      return next(new HttpError("invalid user credentials", 500));
    }

    if (!isValidPassword) {
      return next(new HttpError("invalid user credentials", 500));
    }

    let token;

    try {
      token = jwt.sign({ user_id: user.id }, `${process.env.TOKEN_KEY}`, {
        expiresIn: "1h",
      });
    } catch (err) {
      return next(new HttpError("invalid user credentials", 500));
    }

    return res.status(200).json({ token: token, message: "Logged in!" });
  }

  return next(new HttpError("invalid user credentials5", 401));
};

signupUser = async (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please try again", 422);
  }

  const { email, password } = req.body;

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch {
    return next(new HttpError("Could not create user", 500));
  }

  let user;

  try {
    user = await User.create(
      {
        email: email.toLowerCase(),
        hashed_password: hashedPassword,
      },
      { fields: ["email", "hashed_password"] }
    );
  } catch (err) {
    return next(new HttpError(err, 500));
  }
  let token;

  try {
    token = jwt.sign({ user_id: user.id }, `${process.env.TOKEN_KEY}`, {
      expiresIn: "1h",
    });

    res.status(201).json({ token: token });
  } catch (err) {
    return next(new HttpError("Could not generate token", 500));
  }

  try {
    await EnglishVocab.update(
      { in_rotation: 1 },
      {
        where: { user_id: user.id },
        limit: 5,
      }
    );

    await SpanishVocab.update(
      { in_rotation: 1 },
      {
        where: { user_id: user.id },
        limit: 5,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.loginUser = loginUser;
exports.signupUser = signupUser;
