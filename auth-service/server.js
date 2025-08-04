const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");

connectDb();

const app = express();

const port = 5500;
//const port = process.env.PORT || 5500;

app.use(express.json());

//console.log(process.env.ACCESS_TOKEN_SECRET);

const cors = require("cors");
app.use(cors());


app.use("/api", require("./routes/totalRoutes"));

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});

app.get('/ping', (req, res) => {
  console.log("Frontend hit the backend!");
  res.send("Pong!");
});

