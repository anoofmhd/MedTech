const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please add email"],
    },
    name: {
        type: String,
        required: [true, "Please add the patient Name"],
    },
    age: {
        type: String,
        required: [true, "PLease enter patient age"],
    },
    address: {
        type: String,
        required: [true, "Please enter patient address"],
    },
    phone: {
        type: String,
        required: [true, "Please add the contact phone number"],
    },
    password: {
        type: String,
        required: [true, "Please enter the password"],
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Patient", patientSchema);