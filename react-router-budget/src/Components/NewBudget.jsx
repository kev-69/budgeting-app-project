import React, { useState } from 'react';
import { createBudget } from '../../Backend/api';

const NewBudget = () => {
  const [formData, setFormData] = useState({
    name: '',
    amount: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Make API call to create a new budget
      await createBudget(formData);
      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create new budget</h2>
      <form onSubmit={handleSubmit} className="grid-sm">
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="name"
            id="newBudget"
            placeholder="e.g. Groceries"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            name="amount"
            id="newBudgetAmount"
            placeholder="e.g. $400"
            step="0.10"
            inputMode="decimal"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn--dark" disabled={isLoading}>
          {isLoading ? 'Creating Budget...' : 'Add Budget'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default NewBudget;