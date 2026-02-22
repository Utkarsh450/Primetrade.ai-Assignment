const Budget = require("../models/budget.models");
const Expense = require("../models/Expense.models");

async function createBudget(req, res) {
  try {
    const { category, month, amount, emoji } = req.body;

    const budget = await Budget.create({
      user: req.user.id,
      category,
      month,
      amount,
      emoji,
      spent: 0,
      ExpenseItems: 0,
    });

    res.status(201).json(budget);
  } catch (err) {
    console.log("Error", err);
    
    res.status(500).json({ message: "Server error", error: err });
  }
}

async function getBudget(req, res) {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function deleteBudget(req, res) {
  try {
    const { id } = req.params;

    const budget = await Budget.findById(id);

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    // Make sure user owns it
    if (budget.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Delete related expenses
    await Expense.deleteMany({ budgetId: id });

    await budget.deleteOne();

    res.json({ message: "Budget deleted" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { createBudget, getBudget, deleteBudget };