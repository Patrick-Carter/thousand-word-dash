const express = require("express");

const router = express.Router();

const etosControllers = require("../controllers/etos-controllers");

router.get("/", etosControllers.getEtoS);

router.post("/checketos", etosControllers.checkEtoS);

router.post("/addmoreetos", etosControllers.addMoreEtoS);

module.exports = router;
