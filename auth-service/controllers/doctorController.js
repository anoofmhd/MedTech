const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const axios = require("axios");

//@desc login Doctor
//@route GET /api/doctorLogin
//@access public
const doctorLogin = asyncHandler( async (req, res) => {
    const { email, password } = req.body;
    
    try {
        if ( !email || !password ){
            res.json({ message: "All fields are mandatory.!"});
        } else {

            const response = await axios.get("https://doctorservice-ymcb.onrender.com/api/doctorLogin",{
                params: { email, password }
            });
    /*
            const response = await axios.get("http://localhost:5005/api/doctorLogin",{
                params: { email, password }
            });
    */
            //console.log("inside doctor login");
            res.status(201).json(response.data);
        }    
    } catch(error) {
        console.error("Error logging in Doctor : ", error.message);
        res.json({ message: "Failed to login Doctor."});
    }
});

//@desc create new doctor
//@route POST /api/doctor
//@access public
const newDoctor = asyncHandler( async (req, res) => {
    const role = "doctor";
    try {
        const { username, email, age, address, phone, specialization, qualification, weeklyAvailability, availableSlots, password } = req.body;

        //console.log("inside newDoctor");
        if ( !username || !email || !age || !address || !phone || !specialization || !qualification || !weeklyAvailability || !availableSlots || !password ) {
            res.status(400);
            console.log("All fields are mandatory.");
            //res.json({ message: "All fields are mandatory."});
            throw new Error("All fields are mandatory.");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const response = await axios.post("https://doctorservice-ymcb.onrender.com/api/doctor", {
            username,
            email,
            age,
            address,
            phone,
            specialization,
            qualification,
            weeklyAvailability,
            availableSlots,
            password,
            //role: role,
        });
        
        res.status(201).json(response.data);

    } catch (error) {
        console.error("Error registering Doctor : ", error.message);
        res.status(500).json({ message: "Failed to register Doctor."});
    }
});

//@desc one doctor
//@route GET /api/doctors/:id
//@access public
const getDoctor = asyncHandler( async (req, res) => {
    
});

module.exports = { newDoctor, getDoctor, doctorLogin };

