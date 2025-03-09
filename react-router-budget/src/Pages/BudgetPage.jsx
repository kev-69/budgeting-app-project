import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BudgetPage = () => {
  const [budget, setBudget] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch budget and expenses data from backend
    const fetchData = async () => {
      try {
        // Fetch budget data
        const budgetResponse = await axios.get('/api/budgets/:id'); // Replace '/api/budgets/:id' with your actual backend route
        setBudget(budgetResponse.data);

        // Fetch expenses data
        const expensesResponse = await axios.get(`/api/expenses?budgetId=${budgetResponse.data.id}`); // Replace '/api/expenses' with your actual backend route
        setExpenses(expensesResponse.data);

        setLoading(false); // Set loading to false after data fetching is complete
      } catch (error) {
        setError(error.message); // Set error state if there's an error fetching data
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData(); // Call fetchData function when component mounts
  }, []); // Empty dependency array ensures useEffect runs only once when component mounts

  if (loading) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there's an error fetching data
  }

  return (
    <div className="grid-lg" style={{ "--accent": budget.color }}>
      <h1 className="h2">
        <span className="accent">{budget.name} Overview</span>
      </h1>
      <div className="flex-lg">
        {/* Display budget item */}
        <div className="budget">
          <div className="progress-text">
            <h3>{budget.name}</h3>
            <p>{budget.amount} Budgeted</p>
          </div>
          {/* Calculate and display progress bar */}
          <progress max={budget.amount} value={calculateTotalExpenses(expenses)}>
            {formatPercentage(calculateTotalExpenses(expenses) / budget.amount)}
          </progress>
          <div className="progress-text">
            <small>{calculateTotalExpenses(expenses)} spent</small>
            <small>{budget.amount - calculateTotalExpenses(expenses)} remaining</small>
          </div>
        </div>
        {/* Display expense form */}
        <ExprenseForm budgetId={budget.id} />
      </div>
      {/* Display expenses table */}
      {expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;