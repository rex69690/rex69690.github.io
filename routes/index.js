const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Home route - Dashboard
router.get('/', async (req, res) => {
  try {
    // Get all expenses
    const expenses = await Expense.find().sort({ date: -1 });
    
    // Calculate total expenses
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    
    // Calculate expenses by category
    const expensesByCategory = {};
    expenses.forEach(expense => {
      if (!expensesByCategory[expense.category]) {
        expensesByCategory[expense.category] = 0;
      }
      expensesByCategory[expense.category] += expense.amount;
    });
    
    res.render('dashboard', {
      expenses,
      totalExpenses,
      expensesByCategory
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Money Management Tips route
router.get('/tips', (req, res) => {
  res.render('tips');
});

module.exports = router; 