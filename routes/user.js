const express = require("express");
const { handleUserSignup, handleuserSignin } = require("../controllers/user");
const router = express.Router();

router.post("/", handleUserSignup);
router.post("/login", handleuserSignin);

module.exports = router;
