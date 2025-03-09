import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Errors from '../Pages/Errors';
import Table from '../Components/Table';

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('/api/expenses');
        setExpenses(response.data);
        setLoading(false);
      } catch (error) {
        setErrorMessage(error.response.data.message); // Adjust this according to your backend error response
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <Errors errorMessage={errorMessage} />;
  }

  return (
    <div>
      <h1>All Expenses</h1>
      {expenses.length > 0 ? (
        <div className="grid-md">
          <p>
            <b>Recent Expenses</b> <small>({expenses.length} total)</small>
          </p>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No expenses to show</p>
      )}
    </div>
  );
};

export default ExpensePage;