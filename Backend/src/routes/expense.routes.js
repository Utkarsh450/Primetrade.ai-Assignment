const express = require("express");
const ExpenseModels = require("../models/Expense.models");
const verifyToken = require("../middleware/VerifyToken");
const budgetModels = require("../models/budget.models");
const router = express.Router();
router.get("/", verifyToken, async (req, res) => {
  const expenses = await ExpenseModels.find({ user: req.user.id });
  res.json(expenses);
});

router.post("/", verifyToken, async (req, res) => {
  const { budgetId, name, amount, month, category } = req.body;

  const expense = await ExpenseModels.create({
    user: req.user.id,
    budgetId,
    name,
    amount,
    month,
    category,
  });

  // Update budget
  await budgetModels.findByIdAndUpdate(budgetId, {
    $inc: {
      spent: amount,
      ExpenseItems: 1,
    },
  });

  res.status(201).json(expense);
});


router.delete("/:id", verifyToken, async (req, res) => {
  const expense = await ExpenseModels.findById(req.params.id);

  if (!expense) return res.status(404).json({ message: "Not found" });

  await budgetModels.findByIdAndUpdate(expense.budgetId, {
    $inc: {
      spent: -expense.amount,
      ExpenseItems: -1,
    },
  });

  await expense.deleteOne();

  res.json({ message: "Expense deleted" });
});

module.exports = router;