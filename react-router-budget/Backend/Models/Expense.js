import { Schema, model } from 'mongoose';

const expenseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  budgetId: {
    type: Schema.Types.ObjectId,
    ref: 'Budget',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Expense = model('Expense', expenseSchema);

export default Expense;