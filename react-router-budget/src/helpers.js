// Colors
const generateRandomColor = () => {
    const existingBudgetsLength = fetchData ("budgets")?.length ?? 0;
    return `${existingBudgetsLength * 34} 65% 50%`
}
//Local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

export const wait = () => new Promise(res => setTimeout(res, Math.random() * 800))

// Delete items
export const deleteItem = ({key}) => {
    return localStorage.removeItem(key)
}

// Create Budget
export const createBudget = ( {name, amount} ) => {
    const newItem = {
        id: crypto.randomUUID(), 
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor(),
    }
    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem ("budgets", JSON.stringify([...existingBudgets, newItem]));
}

//Adding Expense
export const createExpense = ( {name, amount, budgetId} ) => {
    const newItem = {
        id: crypto.randomUUID (), 
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId,
    }
    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem ("expenses", JSON.stringify([...existingExpenses, newItem]));
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
}

// Formatting percentages
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimunFractionDigits: 0,
    })
}


// Total spent 
export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData ("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) =>{
        if (expense.budgetId !== budgetId) return acc
        return acc += expense.amount
    }, 0)
    return budgetSpent;
}