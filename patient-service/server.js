const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

connectDB();

const app = express();

const port = process.env.PORT || 4000;
//port = 4000;

app.use(express.json());

app.use("/api", require("./routes/patientRoutes"));

app.use(errorHandler);

app.listen(port,"0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});