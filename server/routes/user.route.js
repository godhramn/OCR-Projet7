const express = require("express");
const router = express.Router();

const userCtrl = require('../controllers/user.controller')
const auth = require("../middleware/auth");

router.post("/signup", userCtrl.signUp);
//router.post("/login", userCtrl.logIn);
//router.put("/logout", userCtrl.logOut);

module.exports = router;