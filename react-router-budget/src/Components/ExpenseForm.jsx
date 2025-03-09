import React, { useState } from 'react';
import { createExpense } from '../../Backend/api'; 

const ExpenseForm = ({ budgets }) => {
  const [formData, setFormData] = useState({
    newExpense: '',
    newExpenseAmount: '',
    newExpenseBudget: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createExpense(formData); // Invoke your backend API function to create the expense
      // Optionally, handle any success messages or redirect the user
      // Reset the form after successful submission
      setFormData({
        newExpense: '',
        newExpenseAmount: '',
        newExpenseBudget: '',
      });
    } catch (error) {
      console.error('Error creating expense:', error);
      // Optionally, display an error message to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">Add New Expense</h2>
      <form onSubmit={handleSubmit} className="grid-sm">
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name:</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g. Coffee"
              value={formData.newExpense}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount:</label>
            <input
              type="number"
              step="0.10"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g. $3.50"
              value={formData.newExpenseAmount}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget">Budget Category</label>
          <select
            name="newExpenseBudget"
            id="newExpenseBudget"
            value={formData.newExpenseBudget}
            onChange={handleChange}
            required
          >
            <option value="">Select budget</option>
            {budgets.map((budget) => (
              <option key={budget.id} value={budget.id}>
                {budget.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;