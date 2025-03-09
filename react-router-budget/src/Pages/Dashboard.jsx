import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userName, setUserName] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch user data, budgets, and expenses from backend
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.get('/api/user'); // Replace '/api/user' with your actual backend route
        setUserName(userResponse.data.userName);

        // Fetch budgets data
        const budgetsResponse = await axios.get('/api/budgets'); // Replace '/api/budgets' with your actual backend route
        setBudgets(budgetsResponse.data);

        // Fetch expenses data
        const expensesResponse = await axios.get('/api/expenses'); // Replace '/api/expenses' with your actual backend route
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
    <div className="dashboard">
      <h2>
        Welcome to your Dashboard <span className="accent">{userName}</span>
      </h2>
      <div className="grid-sm">
        {/* Display new budget form */}
        <NewBudget />
        {/* Display expense form */}
        <ExprenseForm budgets={budgets} />
      </div>
      {budgets.length > 0 ? (
        <div className="grid-lg">
          <h2>Existing Budgets</h2>
          <div className="budgets">
            {/* Display existing budgets */}
            {budgets.map((budget) => (
              <BudgetItem key={budget.id} budget={budget} />
            ))}
          </div>
          {/* Display recent expenses table */}
          {expenses.length > 0 && (
            <div className="grid-md">
              <h2>Recent Expenses</h2>
              <Table expenses={expenses.slice(0, 6)} />
              {expenses.length > 6 && (
                <Link to="expenses" className="btn btn--dark">
                  View all expenses
                </Link>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="grid-sm">
          <p>Personal budgeting is the secret to financial freedom.</p>
          <p>Create a budget to get started!</p>
          {/* Display new budget form if no budgets exist */}
          <NewBudget />
        </div>
      )}
    </div>
  );
};

export default Dashboard;