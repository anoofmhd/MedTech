const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");

connectDb();

const app = express();

const port = 5005;
//const port = process.env.PORT || 5005;

app.use(express.json());

app.use("/api", require("./routes/doctorRoutes"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});