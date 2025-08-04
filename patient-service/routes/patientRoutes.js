const express = require("express");
const router = express.Router();
const { newPatient, getPatients, getPatient, updatePatient, deletePatient, generateBill, bookAppointment, loginPatient } = require("../controllers/patientController");

router.route("/patients/login").post(loginPatient);
router.route("/patients").get(getPatients).post(newPatient);
router.route("/patients/:id").get(getPatient).put(updatePatient).delete(deletePatient).post(bookAppointment);
router.route("/patients/generatebill/:id").post(generateBill);

module.exports = router;


