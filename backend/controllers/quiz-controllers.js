const EnglishVocab = require("../models/EnglishVocab");
const SpanishVocab = require("../models/SpanishVocab");
const db = require("sequelize");

const HttpError = require("../models/http-error");

const quizEnglish = (req, res, next) => {
  const { user_id } = req.userData;

  EnglishVocab.findAll({
    attributes: ["english_spanish_words_id"],
    where: { user_id: user_id, in_quiz: 1 },
    include: "english_word",
  })
    .then((words) => {
      res.status(200).json({ words });
    })
    .catch((err) => {
      return next(new HttpError("No words added to quiz yet", 404));
    });
};

const quizSpanish = (req, res, next) => {
  const { user_id } = req.userData;

  SpanishVocab.findAll({
    attributes: ["english_spanish_words_id"],
    where: { user_id: user_id, in_quiz: 1 },
    include: "spanish_word",
  })
    .then((words) => {
      res.status(200).json({ words });
    })
    .catch((err) => {
      return next(new HttpError("No words added to quiz yet", 404));
    });
};

const addQuizEtoS = (req, res, next) => {
  const { english_spanish_words_id } = req.body;
  const { user_id } = req.userData;

  EnglishVocab.update(
    { in_quiz: 1 },
    {
      where: {
        user_id: user_id,
        english_spanish_words_id: english_spanish_words_id,
      },
    }
  )
    .then((result) => {
      res.status(200).json({ message: "added to quiz!" });
    })
    .catch((err) => {
      return next(new HttpError("could not add word to quiz", 404));
    });
};

const addQuizStoE = (req, res, next) => {
  const { english_spanish_words_id } = req.body;
  const { user_id } = req.userData;

  SpanishVocab.update(
    { in_quiz: 1 },
    {
      where: {
        user_id: user_id,
        english_spanish_words_id: english_spanish_words_id,
      },
    }
  )
    .then((result) => {
      res.status(200).json({ message: "added to quiz!" });
    })
    .catch((err) => {
      return next(new HttpError("could not add word to quiz", 404));
    });
};

const removeQuizEtoS = (req, res, next) => {
  const { english_spanish_words_id } = req.body;
  const { user_id } = req.userData;

  EnglishVocab.update(
    { in_quiz: 0 },
    {
      where: {
        user_id: user_id,
        english_spanish_words_id: english_spanish_words_id,
      },
    }
  )
    .then((result) => {
      res.status(200).json({ message: "quiz item removed" });
    })
    .catch((err) => {
      return next(new HttpError(err, 500));
    });
};

const removeQuizStoE = (req, res, next) => {
    const { english_spanish_words_id } = req.body;
    const { user_id } = req.userData;
  
    SpanishVocab.update(
      { in_quiz: 0 },
      {
        where: {
          user_id: user_id,
          english_spanish_words_id: english_spanish_words_id,
        },
      }
    )
      .then((result) => {
        res.status(200).json({ message: "quiz item removed" });
      })
      .catch((err) => {
        return next(new HttpError(err, 500));
      });
  };

exports.quizEnglish = quizEnglish;
exports.quizSpanish = quizSpanish;
exports.addQuizEtoS = addQuizEtoS;
exports.addQuizStoE = addQuizStoE;
exports.removeQuizEtoS = removeQuizEtoS;
exports.removeQuizStoE = removeQuizStoE;
