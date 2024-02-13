// React Router Dom imports
import { redirect } from "react-router-dom";

// Helpers imports
import { deleteItem, getAllMatchingItems } from "../helpers";

// Heroicons library imports
import { toast } from "react-toastify";


export function deleteBudget({params}) {
    try {
        deleteItem({key: "budgets", id: params.id});

        const associatedExpenses = getAllMatchingItems({category: "expenses", key:"budgetId", value: params.id});

        associatedExpenses.forEach((expense) => {
            deleteItem({key: "expenses", id: expense.id
            })
        });

        toast.success("Budget deleted successfully.");
    } catch(e) {
        throw new Error("There was a problem deleting your budget.")
    }
    return redirect("/"); 
}