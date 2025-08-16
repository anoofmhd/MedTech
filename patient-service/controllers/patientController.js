const asyncHandler = require("express-async-handler");
const Patient = require("../models/patientModel");
const bcrypt = require("bcrypt");

//@desc login patient
//@route GET /api/patient/login
//@access 
const loginPatient = asyncHandler(async (req, res) =>{
    const { email } = req.body;
    const patient = await Patient.findOne({ email });
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.status(200).json(patient);
});

//@desc Get all patients
//@route GET /api/patients
//@access public
const getPatients = asyncHandler( async (req, res) => {
    const patients = await Patient.find();
    res.status(200).json(patients);
});

//@desc one patient
//@route GET /api/patients/:id
//@access public
const getPatient = asyncHandler( async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
       // res.status(404);
       // return res.json({ message: "Patient not found" });
       // throw new Error("Patient not found");
       return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
});

//@desc create new patient
//@route POST /api/patients
//@access public
const newPatient = asyncHandler( async (req, res) => {
    console.log("The request body is : ", req.body);
    const { email, name, age, address, phone, password } = req.body;
    if ( !email || !name || !age || !address || !phone || !password ) {
        res.status(400);
        //res.json({ message: "All fields are mandatory !"});
        throw new Error("All fields are mandatory ! ");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const patient = await Patient.create({
        email,
        name,
        age,
        address,
        phone,
        password: hashedPassword
   });
    res.status(201).json(patient);
});

//@desc Update patient
//@route GET /api/patients/:id
//@access public
const updatePatient = asyncHandler( async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatePatient);
});

//@desc Get all patients
//@route GET /api/patients
//@access public
const deletePatient = asyncHandler( async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    await Patient.findByIdAndDelete(req.params.id);
    res.status(200).json(patient);
});

//@desc Book an appointment
//@route POST /api/patients/appointment/:id
//@access public
const bookAppointment = asyncHandler( async (req, res) => {
    res.json({ message: " Book Appointment "})
    //console.log(" Book appointment");
});

//@desc Generate bill
//@route POST /api/patients/generatebill/:id
//@access public
const generateBill = asyncHandler( async (req, res) => {
    res.json({ message: " Bill Generated. "})
    //console.log(" Book appointment");
});

module.exports = { bookAppointment, generateBill, deletePatient, updatePatient, getPatient, getPatients, newPatient, loginPatient };
