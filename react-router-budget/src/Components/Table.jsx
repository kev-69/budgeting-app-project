import React, { useState, useEffect } from 'react';
import { getAllExpenses } from '../../Backend/api';
import ExpenseItem from './ExpenseItem';

const Table = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getAllExpenses(); // Make API call to get all expenses
        setExpenses(data); // Update expenses state with data from the server
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="table">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : expenses.length === 0 ? (
        <p>No expenses to show</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
              {/* Add more table headers if needed */}
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <ExpenseItem key={expense.id} expense={expense} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;