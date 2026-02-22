const mongoose = require("mongoose")
const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: String,
    amount: Number,
    spent: {
      type: Number,
      default: 0,
    },
    month: String,
    emoji: String,
    ExpenseItems: {
      type: Number,
      default: 0,
    },
    createdAt: String,
  },

);

module.exports = mongoose.model("Budget", budgetSchema);