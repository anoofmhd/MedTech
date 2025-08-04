const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


const validateToken = asyncHandler(async (req, res, next) => {
    //const token;
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }


    if (authHeader && authHeader.startsWith("Bearer")) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {

          if (decoded.user.role !== "receptionist") {
            res.status(401);
            throw new Error("User is not receptionist");
          }
          
          if (err) {
            res.status(401);
            throw new Error("User is not authorized");
          }
            
            req.user = decoded.user;
            next();
        });

        if (!token){
            res.status(401);
            throw new Error("User is not authorized or token is missing");

        }
    }
});


/*
 
const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];


  console.log(token);
  console.log(process.env.ACCESS_TOKEN_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded);
    console.log(decoded.user.role);
    
    if (decoded.user.role !== "receptionist") {
      return res.status(403).json({ message: "Unauthorized role" });
    }
    
    req.user = decoded;
    next();
    
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

*/


module.exports = validateToken;