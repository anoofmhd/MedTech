const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the doctors username"],
    },
    email: {
        type: String,
        required: [true, "Please add the user email"],
        unique: [true, "Email address already taken"],
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
    specialization: {
        type: String,
        required: [true, "Please enter doctors specialization."],
        index: true, //for faster search
    },
    qualification: {
        type: [String], //Array of qualifications
        required: [true, "Please enter doctor qualification."]
    },
    weeklyAvailability: [
        {
            dayOfWeek: {
                type: String,
                required: true,
            },
            startTime: {
                type: String,
                required: true,
            },
            endTime: {
                type: String,
                required: true,
            },
        },
    ],
    availableSlots: [
        {
            date: {
                type: Date,
                required: [true, "Please enter the appointment date"],
            },
            startTime: {
                type: String,
                required: [true, "Please enter the slot start time"],
            },
            endTime: {
                type: String,
                required: [true, "Please enter the slot and time"],
            },
            isBooked: {
                type: Boolean,
                default: false,
            },
        },
    ],
    password: {
        type: String,
        required: [true, "Please add the user password"],
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Doctor", doctorSchema);
