const EnglishVocab = require("../models/EnglishVocab");
const SpanishVocab = require("../models/SpanishVocab");
const db = require("sequelize");

const HttpError = require("../models/http-error");

const learnedEnglish = (req, res, next) => {
  const { user_id } = req.userData;

  EnglishVocab.findAll({
    attributes: ["english_spanish_words_id"],
    where: { user_id: user_id, current_stage: "learned" },
    include: "english_word",
  })
    .then((words) => {
      if (words === null) {
        return res.status(200).json({ noWords: true });
      }

      res.status(200).json({ words });
    })
    .catch((err) => {
      return next(new HttpError("No words learned yet.", 404));
    });
};

const learnedSpanish = (req, res, next) => {
  const { user_id } = req.userData;

  SpanishVocab.findAll({
    attributes: ["english_spanish_words_id"],
    where: { user_id: user_id, current_stage: "learned" },
    include: "spanish_word",
  })
    .then((words) => {
      if (words === null) {
        return res.status.json({ noWords: true });
      }

      res.status(200).json({ words });
    })
    .catch((err) => {
      return next(new HttpError("Something went wrong", 500));
    });
};

exports.learnedSpanish = learnedSpanish;
exports.learnedEnglish = learnedEnglish;
