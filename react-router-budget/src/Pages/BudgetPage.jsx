// Imports from react
import React from 'react'

// React router dom imports
import { useLoaderData } from 'react-router-dom';

//Helpers imports
import { createExpense, deleteItem, getAllMatchingItems } from '../helpers'

// Components imports
import BudgetItem from '../Components/BudgetItem';
import ExprenseForm from '../Components/ExprenseForm';
import Table from '../Components/Table';

// Library imports
import { toast } from 'react-toastify';

export async function budgetLoader ({params}) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  })

  if (!budget) {
    throw new Error("The budget you're trying to find does not exist.");
  }

  return {budget, expenses}
}

export async function budgetAction({request}) {
  const data = await request.formData();
  const {_action, ...values} = Object.fromEntries(data);

  if (_action === "createExpense") {
    try {
          createExpense ({name: values.newExpense, amount: values.newExpenseAmount, budgetId: values.newExpenseBudget})
          return toast.success(`${values.newExpense} Expense  Added`)
        } catch (e) {
          throw new Error ("There was a problem adding your expense.")
        }
  }

  if (_action === "deleteExpense") {
    try{
      deleteItem({key: "expenses", id: values.expenseId,});
    return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.  ")
    }    
  }
}

const BudgetPage = () => {
  const {budget, expenses} = useLoaderData();

  return (
    <div className="grid-lg" style={{"--accent": budget.color}}>
      <h1 className="h2"><span className="accent">{budget.name} Overview</span></h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <ExprenseForm budgets={[budget]}/>
      </div>
        {
          expenses && expenses.length > 0 && (
            <div className="grid-md">
              <h2>
                <span className="accent">{budget.name}</span>Expenses
              </h2>
              <Table expenses={expenses} showBudget={false}/>
            </div>
          )
        }
    </div>
  )
}

export default BudgetPage
