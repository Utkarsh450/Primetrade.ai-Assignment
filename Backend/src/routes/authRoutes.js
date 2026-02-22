const express = require("express");
const router = express.Router();
const { LoginController, RegisterController, LogoutController, ProtectedRoute } = require("../controllers/auth.controller");
const verifyToken = require("../middleware/VerifyToken");

router.post("/login", LoginController);
router.post("/register", RegisterController);
router.get("/logout", LogoutController);
router.get("/me", verifyToken, ProtectedRoute);

module.exports = router;