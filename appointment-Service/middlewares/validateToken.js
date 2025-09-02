const { json } = require("express");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


/*
const validateToken = asyncHandler(async (req, res, next) => {
    //const token;

    const authHeader = req.headers.Authorization || req.headers.authorization;

    /*
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "No token provided" });
    }
    else {
        console.log("Token provided.");
        //res.json({ message: "Token provided" });
    }

    if (authHeader && authHeader.startsWith("Bearer")) {
        const token = authHeader.split(" ")[1];
        //console.log(token);
        //res.json(token);
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            console.log(decoded);
            if (decoded.patient.role !== "patient" ) {
                res.json("Failure.....");
            }
            if ( !token ) {
                res.json(token);
            }
        });
    }
        
    console.log(authHeader);
    if (authHeader && authHeader.startsWith("Bearer")) {
      //  const token = authHeader.split(" ")[1];

        //jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
          /*
          if ( !(decoded.user.role === "receptionist" ||  decoded.patient.role === "patient" ) ) {
            res.status(401);
            throw new Error("Booking is only possible for Receptionist or Patient");
          }
          
          if (err) {
            res.status(401);
            throw new Error("User is not authorized");
          }
            req.patient = decoded.patient;
            //req.user = decoded.user;
            next();
        });
        
        if ( !authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("Token Missing");
            return res.json({ message: "Token missing"});
        }

        if (!token){
            res.status(401);
            throw new Error("User is not authorized or token is missing");

        }
    }
});
*/

const validateToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if ( !authHeader || !authHeader.startsWith("Bearer")) {
        return res.json({ message: "Token is missing." });
    }

    const token = authHeader.split(" ")[1];
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.json({ message: "Unauthorized." });
        }
        req.user = decoded;
        next();
    });

});


module.exports = validateToken;