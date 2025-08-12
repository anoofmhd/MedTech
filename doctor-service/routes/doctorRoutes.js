const express = require("express");
const router = express.Router();
const { newDoctor } = require("../controllers/doctorController");

router.route("/doctor").post(newDoctor);

module.exports = router;