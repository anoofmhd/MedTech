const express = require("express");
const router = express.Router();
const { bookAppointment } = require ("../controllers/appointmentController");
const validateToken = require("../middlewares/validateToken");

router.use(validateToken);
router.route("/appointments").post(bookAppointment);

module.exports = router;