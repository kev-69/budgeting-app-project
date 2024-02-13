// React router dom imports
import { Link, useLoaderData } from "react-router-dom";

// Helper Functions
import { createBudget, createExpense, deleteItem, fetchData, wait } from "../helpers";

// Components imports
import SignUp from "../Components/SignUp";
import NewBudget from "../Components/NewBudget";
import ExprenseForm from "../Components/ExprenseForm";
import BudgetItem from "../Components/BudgetItem";
import Table from "../Components/Table";

// Library imports
import { toast } from "react-toastify"


// Loaders 
export function dashboardLoader() {
    const userName = fetchData ("userName");
    const budgets = fetchData ("budgets");
    const expenses = fetchData ("expenses");
    return { userName, budgets, expenses };
}

// Actions
export async function dashboardAction ({request}) {
    await wait();
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);

    if (_action === "newUser") {
        try {
          localStorage.setItem("userName", JSON.stringify(values.userName))
          return toast.success(`Welcome ${values.userName}`)
      } catch (e) {
          throw new Error ("There was a problem creating your account.")
      }
    }

    if (_action === "createBudget") {
      try {
        createBudget ({name: values.newBudget, amount: values.newBudgetAmount})
        return toast.success (`Budgetted ${values.newBudgetAmount}USD on ${values.newBudget}!`) 
      } catch (e) {
        throw new Error ("There was a problem creating your budget.")
      }
    } 

    if (_action === "createExpense") {
        try {
          createExpense ({name: values.newExpense, amount: values.newExpenseAmount, budgetId: values.newExpenseBudget})
          return toast.success(`${values.newExpense} Expense Added.`)
      } catch (e) {
          throw new Error ("There was a problem adding your expense.")
      }
    }

    if (_action === "deleteExpense") {
      try {
            deleteItem ({name: values.newExpense, key: "expenses", id: values.expenseId})
            return toast.success(`${values.newExpense} Expense  Deleted`)
          } catch (e) {
            throw new Error ("There was a problem deleting your expense.")
          }
    }
}

const Dashboard = () => {
    const { userName, budgets, expenses } = useLoaderData();

  return (
    <>   
      {userName ? (
      <div className="dashboard">
        <h2>Welcome to your Dashboard <span className="accent">{userName}</span></h2>
        <div className="grid-sm">
          {
            budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                    <NewBudget />
                    <ExprenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {
                    budgets.map ((budget) => ( 
                    <BudgetItem key = {budget.id} budget={budget} />))
                  }
                </div>
                {
                  expenses && expenses.length > 0 && (
                    <div className="grid-md">
                      <h2>Recent Expenses</h2>
                      <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)
                      .slice(0, 6)} />
                      {expenses.length > 6 && (
                        <Link to="expenses" className="btn btn--dark">
                          View all expenses
                        </Link>
                      )}
                    </div>
                  )
                }
            </div>
            ) : (
                <div className="grid-sm">
                  <p>Personal budgeting is the secret to financial freedom. </p>
                  <p>Create a budget to get started!</p>
                  <NewBudget />
                </div>
              ) 
          }
            
        </div>
      </div>
      ) : <SignUp />} 
    </>
  )
}

export default Dashboard  