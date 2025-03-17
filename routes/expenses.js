const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Get all expenses - optimized for serverless
router.get('/', async (req, res) => {
  try {
    // Add pagination to reduce data load
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    // Use lean() for faster query execution
    const expenses = await Expense.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    // Get total count for pagination
    const total = await Expense.countDocuments();
    
    res.render('expenses/index', { 
      expenses,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      hasNext: skip + limit < total,
      hasPrev: page > 1
    });
  } catch (err) {
    console.error('Error fetching expenses:', err);
    res.status(500).render('error', { 
      message: 'Could not load expenses', 
      error: process.env.NODE_ENV === 'development' ? err : {} 
    });
  }
});

// Show add expense form
router.get('/add', (req, res) => {
  res.render('expenses/add');
});

// Add expense - optimized
router.post('/', async (req, res) => {
  try {
    const { category, description, amount, date } = req.body;
    
    // Validate input
    if (!category || !description || !amount) {
      return res.status(400).render('expenses/add', { 
        error: 'Please provide category, description and amount',
        formData: req.body
      });
    }
    
    const newExpense = new Expense({
      category,
      description,
      amount: parseFloat(amount),
      date: date ? new Date(date) : Date.now()
    });
    
    await newExpense.save();
    res.redirect('/');
  } catch (err) {
    console.error('Error adding expense:', err);
    res.status(500).render('expenses/add', { 
      error: 'Could not add expense',
      formData: req.body
    });
  }
});

// Show edit expense form - optimized
router.get('/edit/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id).lean();
    if (!expense) {
      return res.status(404).render('error', { message: 'Expense not found' });
    }
    res.render('expenses/edit', { expense });
  } catch (err) {
    console.error('Error fetching expense for edit:', err);
    res.status(500).render('error', { 
      message: 'Could not load expense for editing', 
      error: process.env.NODE_ENV === 'development' ? err : {} 
    });
  }
});

// Update expense - optimized
router.put('/:id', async (req, res) => {
  try {
    const { category, description, amount, date } = req.body;
    
    // Validate input
    if (!category || !description || !amount) {
      const expense = await Expense.findById(req.params.id).lean();
      return res.status(400).render('expenses/edit', { 
        error: 'Please provide category, description and amount',
        expense: { ...expense, ...req.body }
      });
    }
    
    const updatedExpense = {
      category,
      description,
      amount: parseFloat(amount),
      date: date ? new Date(date) : Date.now()
    };
    
    await Expense.findByIdAndUpdate(req.params.id, updatedExpense, { new: true });
    res.redirect('/');
  } catch (err) {
    console.error('Error updating expense:', err);
    res.status(500).render('error', { 
      message: 'Could not update expense', 
      error: process.env.NODE_ENV === 'development' ? err : {} 
    });
  }
});

// Delete expense - optimized
router.delete('/:id', async (req, res) => {
  try {
    const result = await Expense.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).render('error', { message: 'Expense not found' });
    }
    res.redirect('/');
  } catch (err) {
    console.error('Error deleting expense:', err);
    res.status(500).render('error', { 
      message: 'Could not delete expense', 
      error: process.env.NODE_ENV === 'development' ? err : {} 
    });
  }
});

module.exports = router; 