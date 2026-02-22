const mongoose = require("mongoose")
const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    budgetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Budget",
    },
    name: String,
    amount: Number,
    category: String,
    month: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);