const express = require("express");
const router = express.Router();

router.post("/createBudgets", BudgetController);

module.exports = router;