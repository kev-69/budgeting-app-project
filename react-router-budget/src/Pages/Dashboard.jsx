// React router dom imports
import { useLoaderData } from "react-router-dom";

// Helper Functions
import { createBudget, createExpense, fetchData, wait } from "../helpers";

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
    const expenses = fetchData ("expenses")
    return { userName, budgets, expenses }
}

// Actions
export async function dashboardAction ({ request }) {
    await wait();
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data)
    if (_action === "newUser") {
        try {
          localStorage.setItem("userName", JSON.stringify(formData.userName))
          return toast.success(`Welcome ${formData.userName}`)
      } catch (e) {
          throw new Error ("There was a problem creating your account.")
      }
    }

    if (_action === "createBudget") {
      try {
        createBudget ( {name: values.NewBudget, amount: values.NewBudgetAmount} )
        return toast.success ("Budget Created!") 
      } catch (e) {
        throw new Error ("There was a problem creating your budget.")
      }
    } 

    if (_action === "createExpense") {
        try {
          createExpense({name: values.newExpense, amount: values.newExpenseAmount, budgetId: values.newExpenseBudget})
          return toast.success(`${values.newExpense} Expense  Added`)
      } catch (e) {
          throw new Error ("There was a problem adding your expense.")
      }
    }
}

const Dashboard = () => {
    const { userName, budgets, expenses } = useLoaderData()

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
                    budgets.map((budget) => ( <BudgetItem key = {budget.id} budget={budget} />))
                  }
                </div>
                {
                  expenses && expenses.length > 0 && (
                    <div className="grid-md">
                      <h2>Recent Expenses</h2>
                      <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)} />
                    </div>
                  )
                }
            </div>
            )
            : (
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