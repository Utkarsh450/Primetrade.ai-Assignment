const express = require("express");
const router = express.Router();
const { LoginController, RegisterController, LogoutController } = require("../controllers/auth.controller");

router.post("/login", LoginController);
router.post("/register", RegisterController);
router.get("/logout", LogoutController);

module.exports = router;