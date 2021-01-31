const express = require("express");

const router = express.Router();

const learnedControllers = require("../controllers/learned-controllers");

router.get("/english", learnedControllers.learnedEnglish);

router.get("/spanish", learnedControllers.learnedSpanish);

module.exports = router;
