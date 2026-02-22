// models/expense.model.js
const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  budgetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Budget",
    required: true,
  },
  name: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Expense", expenseSchema);