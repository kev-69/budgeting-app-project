// React Router Dom imports
import { useLoaderData } from 'react-router-dom';

//Helpers
import { deleteItem, fetchData } from '../helpers';

//Components imports
import Table from '../Components/Table';

// Library imports
import { toast } from 'react-toastify';

//Loaders
export async function expensesLoader() {
  const expenses = fetchData("expenses");
  return {expenses};
}


// Actions
export async function expenseAction({request}) {
  const data = await request.formData();
  const{_action, ...values} = Object.fromEntries(data);

  if (_action === "deleteExpense") {
    try {
        deleteItem ({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.")
    }
  }
}

export const ExpensePage = () => {
  const {expenses} = useLoaderData();
  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {
        expenses && expenses.length > 0 ? (
          <div className="grid-md">
            <p><b>Recent Expences</b> <small><i>({expenses.length} total)</i></small></p>
            <Table expenses={expenses} />
          </div>
        ) : (
          <p>No expenses to show</p>
      )}
    </div>
  )
}

export default ExpensePage