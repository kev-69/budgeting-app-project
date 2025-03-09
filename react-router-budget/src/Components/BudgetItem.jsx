import React from 'react';
import { useHistory } from 'react-router-dom';
import { deleteBudget } from '../../Backend/api';
import { formatCurrency, formatPercentage } from '../helpers';

const BudgetItem = ({ budget }) => {
  const history = useHistory();

  const handleDelete = async () => {
    try {
      await deleteBudget(budget.id); // Invoke your backend API function to delete the budget
      // Optionally, you can handle any success messages or refresh the page after deletion
      history.push('/'); // Redirect to the home page or any other page after deletion
    } catch (error) {
      console.error('Error deleting budget:', error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <div className="budget">
      <div className="progress-text">
        <h3>{budget.name}</h3>
        <p>{formatCurrency(budget.amount)} Budgeted</p>
      </div>
      <progress max={budget.amount} value={budget.spent}>
        {formatPercentage(budget.spent / budget.amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(budget.spent)} spent</small>
        <small>{formatCurrency(budget.amount - budget.spent)} remaining</small>
      </div>
      <div className="flex-sm">
        <button onClick={handleDelete} className="btn" type="button">
          Delete Budget
        </button>
      </div>
    </div>
  );
};

export default BudgetItem;