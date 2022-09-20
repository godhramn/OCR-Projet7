const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config-comment");
const commentCtrl = require("../controllers/comment.controller");

router.post("/", auth, multer, commentCtrl.createComment);
router.get("/", auth, commentCtrl.getAllComments);
router.get("/:id", auth, commentCtrl.getOneComment);
router.put("/:id", auth, multer, commentCtrl.modifyComment);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;