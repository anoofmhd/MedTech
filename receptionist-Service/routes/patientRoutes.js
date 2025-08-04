/*

const express = require("express");
const router = express.Router();
const { getPatients, getPatient, newPatient, updatePatient, deletePatient, bookAppointment, generateBill } = require("../controllers/patientController");
const validateToken = require("../middleware/validateTokenHandler")

router.use(validateToken);
router.route("/").get(getPatients).post(newPatient);
router.route("/:id").get(getPatient).put(updatePatient).delete(deletePatient).post(bookAppointment);
router.route("/generatebill/:id").post(generateBill);

module.exports = router;

*/