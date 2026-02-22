const express = require("express");
const { createBudget, getBudget, deleteBudget } = require("../controllers/budget.controller");
const verifyToken = require("../middleware/VerifyToken");
const router = express.Router();

router.get("/", verifyToken, getBudget);
router.post("/", verifyToken, createBudget);
router.delete("/:id", verifyToken, deleteBudget);

module.exports = router;