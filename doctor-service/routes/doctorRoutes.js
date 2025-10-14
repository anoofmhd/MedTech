const express = require("express");
const router = express.Router();
const { newDoctor, getDoctor, loginDoctor } = require("../controllers/doctorController");

router.route("/doctor").post(newDoctor);
router.route("/doctors/:id").get(getDoctor);
router.route("/doctorLogin").get(loginDoctor);

module.exports = router;