const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");

connectDB();
const app = express();

//const port = process.env.PORT || 5000;

const port = 5050;

app.use(express.json());

//app.use("/api/receptionist/users", require("./routes/receptionistRoutes"));
//app.use("/api/receptionist/patients", require("./routes/patientRoutes"));
//app.use("/api/receptionist/patients/appointment", require("./routes/patientRoutes"));
//app.use("/api/receptionist/patients/generatebill", require("./routes/patientRoutes"));

app.use("/api", require("./routes/receptionistRoutes"));
app.use("/api/patients", require("./routes/patientProxyRoutes"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});