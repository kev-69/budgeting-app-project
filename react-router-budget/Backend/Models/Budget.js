import { Schema, model } from 'mongoose';

const budgetSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    default: '#000000' // Default color if not specified
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Budget = model('Budget', budgetSchema);

export default Budget;
