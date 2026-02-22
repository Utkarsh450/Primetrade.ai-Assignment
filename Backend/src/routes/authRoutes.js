const express = require("express");
const router = express.Router();
const { LoginController, RegisterController } = require("../controllers/auth.controller");

router.post("/login", LoginController);
router.post("/register", RegisterController);

module.exports = router;