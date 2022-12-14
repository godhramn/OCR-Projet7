const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config-users");
const userCtrl = require('../controllers/user.controller')
const auth = require("../middleware/auth");

router.post("/signup", userCtrl.signUp);
router.post("/login", userCtrl.logIn);
router.put("/logout", userCtrl.logOut);
router.put("/:id", multer, userCtrl.updateUser);
router.get("/", auth.checkUser, userCtrl.getAllUsers);
router.get("/:id", auth.checkUser, userCtrl.getOneUser);
router.delete("/:id", multer, auth.checkUser, userCtrl.deleteUser);

module.exports = router;