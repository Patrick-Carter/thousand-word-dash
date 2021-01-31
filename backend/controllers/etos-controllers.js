const { validationResult } = require("express-validator");
const EnglishSpanishWord = require("../models/EnglishSpanishWord");
const EnglishVocab = require("../models/EnglishVocab");
const db = require("sequelize");

const HttpError = require("../models/http-error");
const { sequelize } = require("../models/EnglishVocab");

const getEtoS = (req, res, next) => {
  const { user_id } = req.userData;

  EnglishVocab.findOne({
    attributes: [
      "english_spanish_words_id",
      "current_stage",
      "next_stage",
      "last_answered",
      "in_rotation",
      "in_quiz",
    ],
    where: {
      user_id: user_id,
      in_rotation: 1,
      current_stage: {
        [db.Op.or]: ["learn", "today"],
      },
    },
    include: "english_word",
  })
    .then((word) => {
      if (word === null) {
        res.status(200).json({ noWords: true });
        return;
      }

      res.status(200).json({
        word: word.english_word,
        stage: word.current_stage,
        nextStage: word.next_stage,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "something went wrong" });
    });
};

const checkEtoS = (req, res, next) => {
  const {
    answer,
    key,
    english_spanish_words_id,
    add_quiz,
    next_stage,
  } = req.body;
  const { user_id } = req.userData;

  // prep the key for checking.
  const prepKey = key
    .toLowerCase()
    .trim()
    .replace(/ /g, "")
    .replace(/á/g, "a")
    .replace(/é/g, "e")
    .replace(/í/g, "i")
    .replace(/ñ/g, "n")
    .replace(/ó/g, "o")
    .replace(/ü/g, "u")
    .replace(/ú/g, "u")
    .split(",")
    .filter((x) => x);

  // prep the answer for checking
  const prepAnswer = answer
    .toLowerCase()
    .trim()
    .replace(/ /g, "")
    .replace(/á/g, "a")
    .replace(/é/g, "e")
    .replace(/í/g, "i")
    .replace(/ñ/g, "n")
    .replace(/ó/g, "o")
    .replace(/ü/g, "u")
    .replace(/ú/g, "u")
    .split(",")
    .filter((x) => x);

  // check answers with the keys in N^2 time.
  const answerCheckFun = (answerArry, keyArry) => {
    let inArray;

    for (i = 0; i < answerArry.length; i++) {
      for (n = 0; n < keyArry.length; n++) {
        if (answerArry[i] === keyArry[n]) {
          inArray = true;
          break;
        } else {
          inArray = false;
        }
      }
    }

    return inArray;
  };

  const answerCheck = answerCheckFun(prepAnswer, prepKey);

  res.status(200).json({ answerCheck });

  if (answerCheck === true) {
    EnglishVocab.update(
      {
        current_stage: db.literal("current_stage + 1"),
        next_stage: db.literal("next_stage + 1"),
        last_answered: db.literal("CURRENT_TIMESTAMP"),
        in_quiz: add_quiz === true ? 1 : db.literal("in_quiz"),
      },
      {
        where: {
          user_id: user_id,
          english_spanish_words_id: english_spanish_words_id,
        },
      }
    );

    const eventName = "".concat(
      "event_",
      user_id,
      "_",
      english_spanish_words_id,
      "_",
      "english"
    );
    let intervalTime = 0;

    if (next_stage === "tomorrow") intervalTime = 1;
    else if (next_stage === "2days") intervalTime = 2;
    else if (next_stage === "week") intervalTime = 7;
    else if (next_stage === "30days") intervalTime = 30;
    else intervalTime = 0;

    if (intervalTime !== 0) {
      sequelize.query(`CREATE EVENT IF NOT EXISTS ${eventName}
      ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL ${intervalTime} DAY
      DO 
      UPDATE english_vocab 
      SET current_stage = 2 
      WHERE user_id = ${user_id} AND english_spanish_words_id = ${english_spanish_words_id};`);
    }
  } else {
    EnglishVocab.update(
      {
        current_stage: 1,
        next_stage: 2,
        last_answered: db.literal("CURRENT_TIMESTAMP"),
        in_quiz: add_quiz === true ? 1 : db.literal("in_quiz"),
      },
      {
        where: {
          user_id: user_id,
          english_spanish_words_id: english_spanish_words_id,
        },
      }
    );
  }
};

const addMoreEtoS = (req, res, next) => {
  const { add_amount } = req.body;
  const { user_id } = req.userData;

  EnglishVocab.update(
    { in_rotation: 1 },
    {
      where: { [db.Op.and]: [{ user_id: user_id }, { in_rotation: 0 }] },
      limit: add_amount,
    }
  )
    .then(() => {
      res.status(200).json({ message: `${add_amount} more words added!` });
    })
    .catch((err) => console.log(err));
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

exports.getEtoS = getEtoS;
exports.checkEtoS = checkEtoS;
exports.addMoreEtoS = addMoreEtoS;
exports.addQuizEtoS = addQuizEtoS;
