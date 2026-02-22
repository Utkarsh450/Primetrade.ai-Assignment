// models/budget.model.js
const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: { type: String, required: true },
  month: { type: String, required: true },
  amount: { type: Number, required: true },
  spent: { type: Number, default: 0 },
  ExpenseItems: { type: Number, default: 0 },
  emoji: { type: String, default: "🙂" },
}, { timestamps: true });

module.exports = mongoose.model("Budget", budgetSchema);