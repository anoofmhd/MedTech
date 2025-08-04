const express = require("express");
const router = express.Router();
const { registerReceptionist, loginReceptionist } = require("../controllers/receptionistController");
const { registerPatient, loginPatient } = require("../controllers/patientController");

//router.post("/register", registerReceptionist);
router.post("/register", (req, res) => {
    const role = req.query.role; //Gets role from URL like ?role=receptionist
    
    if (role === "receptionist") {
        //res.json({ message: "Register Receptionist" });
        registerReceptionist(req, res);

    } else if (role === "doctor") {
        res.json({ message: "Register Doctor"});
    } else if (role === "patient") {
        //res.json({ message: " Register Patient "});
        registerPatient(req, res);
    }
});

//loginreceptionist
router.post("/login", (req, res) => {
    const role = req.query.role; //Gets role from URL like ?role=receptionist

    if (role == null) {
        res.json({ message: "Please enter the role" });
    }

    if (role === "receptionist") {
        //res.json({ message: "Login as receptionist" });
        loginReceptionist(req, res);
        
    } else if (role === "doctor") {
        res.json({ message: "Login as doctor"});
    } else if(role === "patient") {
        loginPatient(req, res);
    }
});

module.exports = router;