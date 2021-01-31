const express = require("express");
const router = express.Router();

const quizControllers = require("../controllers/quiz-controllers");

router.get("/english", quizControllers.quizEnglish);

router.get("/spanish", quizControllers.quizSpanish);

router.post("/addquizetos", quizControllers.addQuizEtoS);

router.post("/addquizstoe", quizControllers.addQuizStoE);

router.post("/removequizetos", quizControllers.removeQuizEtoS);

router.post("/removequizstoe", quizControllers.removeQuizStoE);

module.exports = router;
