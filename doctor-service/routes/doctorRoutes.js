const express = require("express");
const router = express.Router();
const { newDoctor, getDoctor } = require("../controllers/doctorController");

router.route("/doctor").post(newDoctor);
router.route("/doctors/:id").get(getDoctor);

module.exports = router;