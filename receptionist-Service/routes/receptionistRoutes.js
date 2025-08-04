/*

const express = require("express");
const router = express.Router();
const { registerReceptionist, loginReceptionist, currentReceptionist } = require("../controllers/receptionistController");
const validateToken = require("../middleware/validateTokenHandler")

router.post("/register", registerReceptionist);

router.post("/login", loginReceptionist);

router.get("/current", validateToken, currentReceptionist);

module.exports = router;

*/

const express = require("express");
const router = express.Router();
const { booking } = require("../controllers/receptionistController");
const validateToken = require("../middleware/validateTokenHandler")

router.use(validateToken);
router.post("/booking", booking);

module.exports = router;