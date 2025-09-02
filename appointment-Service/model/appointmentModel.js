const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"]
    },
    /*
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
        */
},
    {
        timestamps: true,
    }
);

appointmentSchema.index(
    { 
        patientId: 1, doctorId: 1, date: 1 
    },
    {
        unique: true
    }
);

module.exports = mongoose.model("Appointment", appointmentSchema);