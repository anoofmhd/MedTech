const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");


//getting details from patient-service
const details = asyncHandler ( async (req, res) => {
    //res.json({ message: "Details from patient module !  "});
    const BASE_URL = "http://localhost:4000/api/patients";

    try {
    const response = await axios.get(BASE_URL);
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch patients", error: err.message });
  }

});



module.exports = { details };


