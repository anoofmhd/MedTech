const asyncHandler = require("express-async-handler");
const User = require("../model/receptionistModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//@desc Register a receptionist
//@route GET /api/register?role=receptionist
//@access public
const registerReceptionist = asyncHandler( async (req, res) => {
    const role = "receptionist";
    try {
        //console.log( "Register receptionist in controller" );
        const { username, email, password } = req.body;
        console.log("Success.....");

        if( !username || !email || !password ) {
            res.status(400).json({ message: "All fields are mandatory !"});
            throw new Error(" All fields are mandatory...");
        }

        const userAvailable = await User.findOne({ email });
        if (userAvailable) {
            return res.status(400).json({ message: "User already registered !"});
            //throw new Error("User already registered !");
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        //console.log("Hashed Password: ", hashedPassword);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role,
        });

        console.log(`User created ${user}`);
        if(user) {
            res.status(201).json({ _id: user.id, email: user.email, role: user.role });
        } else {
            res.status(400);
            throw new Error("User data is not valid.")
        }
    } catch (error) {
        console.error("Error during registration:");
        //res.status(500).json({ message: "Internal server Error"});
    }

});

//@desc Login a receptionist
//@route GET /api/login?role=receptionist
//@access public
const loginReceptionist = asyncHandler( async (req, res) => {
    //res.json({ message: "Login as RECeptionist" });
    const { email, password } = req.body;
    try{
        if( !email || !password ) {
            res.status(400);
            throw new Error(" All fields are mandatory !");
        }
        const user = await User.findOne({ email });
        //compare password with hashedpassword
        if (user && (await bcrypt.compare(password, user.password))) {
            //res.json({ message: " Details are correct "});
            const accessToken = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                    role: user.role
                },
            },

             process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30m" },
/*
            res.status(200).json({
                    message: "Login successful",
                    accessToken, // <<<<< send token
                    user: {
                        id: user.id,
                        username: user.username,
                        role: user.role,
                    },
                }),
*/
        );
        res.status(200).json({ accessToken });
        } else {
            res.status(401);
            console.log("Email or password invalid");
            //throw new Error(" Email or password is not valid");
        }
    } catch (error) {
        console.log("Error while login");
    }
});

module.exports = { registerReceptionist, loginReceptionist };