const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyToken, isAdmin } = require("../middlewares/authJwt");

router.get("/", [verifyToken, isAdmin], userController.getAllUsers);
router.put("/password", verifyToken, userController.updatePassword);

module.exports = router;
