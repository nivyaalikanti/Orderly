const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticate } = require("../middleware/authenticate");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authenticate, authController.logout);
router.get("/me", authenticate, authController.getMe);
router.post("/forgotpassword", authController.forgotPassword);
router.patch("/resetpassword/:token", authController.resetPassword);
router.put("/updatepassword", authenticate, authController.updatePassword);

module.exports = router;