import { Router } from 'express';
const router = Router();
import Expense from '../Models/Expense';

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single expense
router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new expense
router.post('/', async (req, res) => {
  const expense = new Expense({
    name: req.body.name,
    amount: req.body.amount,
    budgetId: req.body.budgetId
  });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an expense
router.patch('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    if (req.body.name != null) {
      expense.name = req.body.name;
    }
    if (req.body.amount != null) {
      expense.amount = req.body.amount;
    }
    if (req.body.budgetId != null) {
      expense.budgetId = req.body.budgetId;
    }
    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    await expense.remove();
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;