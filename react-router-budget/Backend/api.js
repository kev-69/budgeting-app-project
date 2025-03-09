import axios from 'axios';

// Function to fetch all expenses from the backend
export const getAllExpenses = async () => {
  try {
    const response = await axios.get('/api/expenses');
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error; // Propagate the error to the caller
  }
};

// Function to create a new expense
export const createExpense = async (expenseData) => {
  try {
    const response = await axios.post('/api/expenses', expenseData);
    return response.data;
  } catch (error) {
    console.error('Error creating expense:', error);
    throw error; // Propagate the error to the caller
  }
};

// Function to delete an expense
export const deleteExpense = async (expenseId) => {
  try {
    const response = await axios.delete(`/api/expenses/${expenseId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error; // Propagate the error to the caller
  }
};

// Function to create a new budget
export const createBudget = async (budgetData) => {
  try {
    const response = await axios.post('/api/budgets', budgetData);
    return response.data;
  } catch (error) {
    console.error('Error creating budget:', error);
    throw error; // Propagate the error to the caller
  }
};

// Function to sign up a user
export const signUp = async (userData) => {
  try {
    const response = await axios.post('/api/signup', userData);
    return response.data;
  } catch (error) {
    console.error('Error signing up user:', error);
    throw error; // Propagate the error to the caller
  }
};

// More functions for other endpoints or operations...
