import React from 'react';
import { deleteExpense } from '../../Backend/api';
import { formatCurrency, formatDate } from '../helpers';

const ExpenseItem = ({ expense }) => {
  const handleDelete = async () => {
    try {
      await deleteExpense(expense.id); // Invoke your backend API function to delete the expense
      // Optionally, you can handle any success messages or refresh the page after deletion
    } catch (error) {
      console.error('Error deleting expense:', error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDate(expense.createdAt)}</td>
      <td>
        {/* Optionally, display budget information if needed */}
        {expense.budget && <span>{expense.budget.name}</span>}
      </td>
      <td>
        <button onClick={handleDelete} className="btn btn--warning" type="button">
          Delete
        </button>
      </td>
    </>
  );
};

export default ExpenseItem;