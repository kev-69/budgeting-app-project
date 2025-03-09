import axios from 'axios';

// Generating random Colors
const generateRandomColor = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

// Local storage
export const fetchData = async (key) => {
    try {
        const response = await axios.get(`/api/${key}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${key} data:`, error);
        throw new Error(`Failed to fetch ${key} data`);
    }
};

// Fake waiting time
export const wait = () => new Promise((res) => setTimeout(res, Math.random() * 500))

// Matching items
export const getAllMatchingItems = async ({ category, key, value }) => {
    try {
        const data = await fetchData(category);
        return data.filter((item) => item[key] === value);
    } catch (error) {
        console.error(`Error getting matching items for ${category}:`, error);
        throw new Error(`Failed to get matching items for ${category}`);
    }
}

// Deleting items
export const deleteItem = async ({ key, id }) => {
    try {
        if (id) {
            await axios.delete(`/api/${key}/${id}`);
        } else {
            // If no id is provided, delete all items
            await axios.delete(`/api/${key}`);
        }
    } catch (error) {
        console.error(`Error deleting ${key}:`, error);
        throw new Error(`Failed to delete ${key}`);
    }
}

// Creating Budget
export const createBudget = async ({ name, amount }) => {
    try {
        const color = generateRandomColor();
        const response = await axios.post('/api/budgets', { name, amount, color });
        return response.data;
    } catch (error) {
        console.error('Error creating budget:', error);
        throw new Error('Failed to create budget');
    }
};

//Adding Expense
export const createExpense = async ({ name, amount, budgetId }) => {
    try {
        const response = await axios.post('/api/expenses', { name, amount, budgetId });
        return response.data;
    } catch (error) {
        console.error('Error creating expense:', error);
        throw new Error('Failed to create expense');
    }
}

// Formatting
//Date formats
export const formatDate = (epoch) => new Date(epoch).toLocaleDateString();

// Currency formats
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
    })
};

// Formatting percentages
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
    })
};

// Total spent 
export const calculateSpentByBudget = (budgetId, expenses) => {
    const budgetExpenses = expenses.filter((expense) => expense.budgetId === budgetId);
    return budgetExpenses.reduce((acc, expense) => acc + expense.amount, 0);
}