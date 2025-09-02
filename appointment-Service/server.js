const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");

connectDb();

const app = express();

const port = 5505;

app.use(express.json());

app.use("/api", require("./routes/appointmentRoute"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

