import { Router } from 'express';
const router = Router();
import Budget from '../Models/Budget';

// Get all budgets
router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single budget
router.get('/:id', async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    res.json(budget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a budget
router.post('/', async (req, res) => {
  const budget = new Budget({
    name: req.body.name,
    amount: req.body.amount,
    color: req.body.color
  });

  try {
    const newBudget = await budget.save();
    res.status(201).json(newBudget);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a budget
router.patch('/:id', async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    if (req.body.name != null) {
      budget.name = req.body.name;
    }
    if (req.body.amount != null) {
      budget.amount = req.body.amount;
    }
    if (req.body.color != null) {
      budget.color = req.body.color;
    }
    const updatedBudget = await budget.save();
    res.json(updatedBudget);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a budget
router.delete('/:id', async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    await budget.remove();
    res.json({ message: 'Budget deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;