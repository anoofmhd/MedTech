const axios = require("axios");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register a patient
//@route POST /api/register?role=patient
//@access public
const registerPatient = asyncHandler( async (req, res) => {
    const role = "patient";
    try {
        const { email, name, age, address, phone, password } = req.body;

        //console.log("inside register patient");

         if( !email || !name || !age || !address || !phone || !password ) {
            res.status(400);
            console.log("All fields are required.");
            throw new Error(" All fields are mandatory !");
        }

        const response = await axios.post("https://medtech-1-xn81.onrender.com/api/patients", {
            email,
            name,
            age,
            address,
            phone,
            password,
            role: role,
        });

        res.status(201).json(response.data);
    } catch (error) {
        console.error("Error registering patient : ", error.message);
        res.status(500).json({ message: "Failed to register patient."});
    }
});

//@desc login a patient
//@route GET /api/login?role=patient
//@access public
const loginPatient = asyncHandler( async (req, res) => {
    //res.json({ message: "Login as patient" });
    const { email, password } = req.body;

    try {
        console.log(email, password);

        if ( !email || !password ) {
            //console.log("All fields are mandatory");
            res.status(400);
            throw new Error(" All fields are mandatory !");
        }

        //call patient service to get patient data
        const response = await axios.post("https://medtech-1-xn81.onrender.com/api/patients/login", {
            email
        });

        //console.log(response);
        const patient = response.data;
        //console.log(patient);
        

        // check password
        const isPasswordValid = await bcrypt.compare(password, patient.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        //giving access token to the patient
        //res.json({ message: " Details are correct "});
        //res.json({ message: " Details are correct "});
        const accessToken = jwt.sign({
            patient: {
                _id: patient._id, 
                email: patient.email,
                name: patient.name,
                age: patient.age,
                address: patient.address,
                phone: patient.phone,
                role: patient.role,
                //id: patient._id,
                
            },
        },
        
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" },
        /*
                    res.status(200).json({
                            message: "Login successful",
                            accessToken, // <<<<< send token
                            user: {
                                id: user.id,
                                username: user.username,
                                role: user.role,
                            },
                        }),
        */
        );
        console.log(accessToken);
        res.json({ message: "Login successfull", data: accessToken});
                  
    } catch (error) {
        console.log("Error while LOGIN........");
        res.status(404).json({ message: "Email or password is invalid."});
    }

    
});


module.exports = { registerPatient, loginPatient };