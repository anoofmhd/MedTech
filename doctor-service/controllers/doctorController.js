const asyncHandler = require("express-async-handler");
const Doctor = require("../models/doctorModel");
const bcrypt = require("bcrypt");

//@desc create new doctor
//@route POST /api/doctor
//@access public
const newDoctor = asyncHandler( async (req, res) => {
    //console.log("The request body is : ", req.body);
    const { username, email, age, address, phone, specialization, qualification, weeklyAvailability, availableSlots, password } = req.body;
    
    if ( !username || !email || !age || !address || !phone || !specialization || !qualification || !weeklyAvailability || !availableSlots || !password ) {
        res.status(400);
        res.json({ message: "All fields are mandatory !"});
        throw new Error("All fields are mandatory ! ");
    }

    //res.json({ message: "doctor created successfully" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await Doctor.create({
        username,
        email,
        age,
        address,
        phone,
        specialization,
        qualification,
        weeklyAvailability,
        availableSlots,
        password: hashedPassword
   });
    res.status(201).json(doctor);
    res.json({ message: "Doctor created successfully."});
    console.log("Doctor Created successfully.")
});

//@desc one doctor
//@route GET /api/doctors/:id
//@access public
const getDoctor = asyncHandler( async (req, res) => {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
        throw new Error("Doctor not found");
    }
    res.status(200).json(doctor);
});

module.exports = { newDoctor, getDoctor };