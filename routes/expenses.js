const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.render('expenses/index', { expenses });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Show add expense form
router.get('/add', (req, res) => {
  res.render('expenses/add');
});

// Add expense
router.post('/', async (req, res) => {
  try {
    const { category, description, amount, date } = req.body;
    
    const newExpense = new Expense({
      category,
      description,
      amount: parseFloat(amount),
      date: date ? new Date(date) : Date.now()
    });
    
    await newExpense.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Show edit expense form
router.get('/edit/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).send('Expense not found');
    }
    res.render('expenses/edit', { expense });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Update expense
router.put('/:id', async (req, res) => {
  try {
    const { category, description, amount, date } = req.body;
    
    const updatedExpense = {
      category,
      description,
      amount: parseFloat(amount),
      date: date ? new Date(date) : Date.now()
    };
    
    await Expense.findByIdAndUpdate(req.params.id, updatedExpense);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Delete expense
router.delete('/:id', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 