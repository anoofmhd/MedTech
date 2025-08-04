const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the username"],
    },
    email: {
        type: String,
        required: [true, "Please add the user email"],
        unique: [true, "Email address already taken"],
    },
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
