const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['food', 'travel', 'housing', 'utilities', 'entertainment', 'other'],
    index: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    index: true
  }
}, { 
  timestamps: true,
  autoIndex: process.env.NODE_ENV !== 'production',
  minimize: true,
  strict: true
});

ExpenseSchema.index({ category: 1, date: -1 });

ExpenseSchema.statics.getTotalExpenses = async function() {
  const result = await this.aggregate([
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);
  return result.length > 0 ? result[0].total : 0;
};

ExpenseSchema.statics.getExpensesByCategory = async function() {
  return this.aggregate([
    { $group: { _id: "$category", total: { $sum: "$amount" } } },
    { $sort: { total: -1 } }
  ]);
};

module.exports = mongoose.model('Expense', ExpenseSchema); 