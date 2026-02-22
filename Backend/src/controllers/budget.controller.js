const Budget = require("../models/budget.models");

async function createBudget(req, res, next) {
	try {
		const { ExpenseItems, category, amount, month, emoji, createdAt } = req.body;

		if (!user || !category || amount === undefined || !month) {
			return res.status(400).json({ message: "Missing required fields" });
		}

		const budgetData = {
			user,
			category,
			amount: Number(amount),
			month,
			emoji: emoji || "",
			createdAt: createdAt ? String(createdAt) : String(new Date()),
		};

		const budget = await Budget.create(budgetData);

		res.status(201).json({ budget });
	} catch (err) {
		res.status(500).json({ message: err.message || "Server error" });
	}
}

module.exports = { createBudget };