const asyncHandler = require("express-async-handler");
const Appointment = require("../model/appointmentModel");
const patientSchema = require("../../patient-service/models/patientModel");
const doctorSchema = require("../../doctor-service/models/doctorModel");
const mongoose = require("mongoose");
const axios = require("axios");

//@desc book appointment
//@route POST /api/appointments
//@access 
/*
const bookAppointment = asyncHandler(async (req, res) => {
    //res.json({ message: "Booking Appointment"});
    
    const { patientId, doctorId, date } = req.body;
    
    try {
        
    
        if ( !patientId || !doctorId || !date ) {
            console.log("All fields are mandatory");
            //throw new Error("All fields are mandatory");
            res.json({ message: "All fields are mandatory! " });
            
        }
        
        // getting patientId from patient Model
        //const patient = await patientSchema.findById(patientId);
        const patient = await axios.get(
            `https://medtech-1-xn81.onrender.com/api/patients/${patientId}`,
            {
                validateStatus: () => true
            }
        );

        if( patient.status === 500 ) {
            console.log("Patient not found.");
            return res.status(500).json({ message: "Patient not found !" });
        } else {
            console.log("Patient available.");
        }
        //console.log(patient.status);

        //getting doctorId from doctor Model
        const doctor = await axios.get(
            `https://doctorservice-ymcb.onrender.com/api/doctors/${doctorId}`,
            {
                validateStatus: () => true
            }
        );

        if( doctor.status === 500 ) {
            console.log("Doctor not found.");
            return res.status(500).json({ message: "Doctor not found !" });
        } else {
            console.log("Doctor available.");
            //res.json({ message: "patient and doctor available" });
        }

        let initialState = "pending";
        if (req.user.role === "receptionist"){
            initialState = "approved";
        }

        const status = "approved";
        const appointment = await Appointment.create({
            patientId,
            doctorId,
            date,
            status
        });

        console.log("Appointment booked");
        await appointment.save();
        return res.status(201).json({ appointment });

        res.status(201).json({
            message: `Appointment ${initialStatus === "approved" ? "booked" : "requested"} successfully`,
            appointment
        });

        //console.log("Patient and doctor are available");
        //res.json({ message: "patient and doctor available" });

        
    } catch (error)  {
        if (error.response?.status === 404) {
            return res.status(404).json({ message: "Patient or Doctor not found" });
        }
        return res.status(401).json({ message: "Internal Server Error" });
    }
});
*/

const bookAppointment = asyncHandler(async (req, res) => {
    try {
        
        const { finalPatientId, doctorId, date } = req.body;
        //const { id, role } = req.user;
        //console.log("hi");
        let patientId;
        let status;
        //let finalPatientId;


        if ( !doctorId || !date ) {
            console.log("All fields are mandatory");
            //throw new Error("All fields are mandatory");
            res.json({ message: "All fields are mandatory! " });
            
        }

        
        //getting doctorId from doctor Model
        const doctor = await axios.get(
            `https://doctorservice-ymcb.onrender.com/api/doctors/${doctorId}`,
            {
                validateStatus: () => true
            }
        );        
        //console.log(doctor);
        if( doctor.status === 500 ) {
            console.log("Doctor not found.");
            return res.status(500).json({ message: "Doctor not found !" });
        } else {
            console.log("Doctor available.");
            //res.json({ message: "patient and doctor available" });
        }

        //console.log(req.user);
        //console.log(req.user.user.role);

        if (req.user.patient) {
            //const patientId = req.user.id;
            //console.log("booking by patient");
            // Take patientId from the req.user.patient.id
            patientId = req.user.patient._id
            //console.log(patientId);
            // Checking if patient is available in the patient database
            const patient = await axios.get(
                `https://medtech-1-xn81.onrender.com/api/patients/${patientId}`,
                {
                    validateStatus: () => true
                }
            );

            if( patient.status === 500 ) {
                console.log("Patient not found.");
                return res.status(500).json({ message: "Patient not found !" });
            } else {
                console.log("Patient available.");
            }
            status = "pending";

            // Checking if already booked for the same date
            const existingAppointment = await Appointment.findOne({
                patientId,
                doctorId,
                date,
            });

            if (existingAppointment) {
                return res.status(400).json({ message: "Patient already has an appointment on this date" });
            }

            // Booking appointment code
            const appointment = await Appointment.create({
                patientId,
                doctorId,
                date,
                status
            });

            console.log("Appointment booked");
            await appointment.save();
            return res.status(201).json({ appointment });



        } else if (req.user.user) {
            //console.log("booking by receptionist");
            //const patientId = req.body.patientId;
            //console.log(patientId);
            const receptionist = req.user.user.role;
            //console.log(receptionist);
            if (receptionist === "receptionist") {
                if ( !finalPatientId ){
                    return res.json({ message: "Not booking possible for receptionist without patientId. "});
                } else {
                    const patient = await axios.get(
                        `https://medtech-1-xn81.onrender.com/api/patients/${finalPatientId}`,
                        {
                            validateStatus: () => true
                        }
                    );
                   // res.json(patient);
                    //console.log(patient);
                
                    if( patient.status === 500 ) {
                        console.log("Patient not found.");
                        return res.status(500).json({ message: "Patient not found !" });
                    } else {
                        console.log("Patient available.");
                    }
                    status = "approved";
                }
                let patientId;
                patientId = finalPatientId;

                // Checking if already booked for the same date
                const existingAppointment = await Appointment.findOne({
                    patientId,
                    doctorId,
                    date,
                });

                if (existingAppointment) {
                    return res.status(400).json({ message: "Patient already has an appointment on this date" });
                }

                // Booking appointment code
                const appointment = await Appointment.create({
                    patientId,
                    doctorId,
                    date,
                    status
                });

                console.log("Appointment booked");
                await appointment.save();
                return res.status(201).json({ appointment });

            } else {
                return res.json({ message: "Unauthorized" });
            }
        }

    } catch (error) {
        res.json({ message: "error creating appointment" });
    }
});

module.exports = { bookAppointment };