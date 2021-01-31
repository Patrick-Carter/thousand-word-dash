const express = require("express");

const router = express.Router();

const stoeControllers = require("../controllers/stoe-controllers");

router.get("/", stoeControllers.getStoE);

router.post("/checkstoe", stoeControllers.checkStoE);

router.post("/addmorestoe", stoeControllers.addMoreStoE);

module.exports = router;
