const express = require("express");
const router = express.Router();
const axios = require("axios");
const { details } = require("../controllers/patientProxyController");
const validateToken = require("../middleware/validateTokenHandler");


//const BASE_URL = "http://localhost:4000/api/patients"; // Patient service URL (adjust as needed)

//console.log(BASE_URL);
router.use(validateToken);
router.route("/").get(details);

module.exports = router;

/*
// Get all patients
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(BASE_URL);
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch patients", error: err.message });
  }
});

*/
