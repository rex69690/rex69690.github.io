const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Add a warmup route to keep the function alive
router.get('/api/warmup', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Function is warm' });
});

// Home route - Dashboard with optimized database query
router.get('/', async (req, res) => {
  try {
    // Get only recent expenses (last 30 days) to reduce data load
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Use lean() for faster query execution (returns plain JS objects)
    const expenses = await Expense.find({ date: { $gte: thirtyDaysAgo } })
      .sort({ date: -1 })
      .lean()
      .limit(50); // Limit to 50 most recent expenses
    
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
    
    // Add a fallback for empty data
    if (expenses.length === 0) {
      return res.render('dashboard', {
        expenses: [],
        totalExpenses: 0,
        expensesByCategory: {},
        message: 'No expenses found. Add your first expense!'
      });
    }
    
    res.render('dashboard', {
      expenses,
      totalExpenses,
      expensesByCategory
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    // Provide a more graceful error page
    res.status(500).render('error', { 
      message: 'Could not load dashboard', 
      error: process.env.NODE_ENV === 'development' ? err : {} 
    });
  }
});

// Money Management Tips route
router.get('/tips', (req, res) => {
  res.render('tips');
});

module.exports = router; 