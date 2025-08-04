const mongoose = require("mongoose");

const receptionistSchema = mongoose.Schema({
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
    role: {
        type: String,
        required: [true, "Please add the role of the user"],
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", receptionistSchema);