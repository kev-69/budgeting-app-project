// React Router Dom imports
import { redirect } from "react-router-dom";

// Helpers imports
import { deleteItem } from "../helpers";

// Library imports
import { toast } from "react-toastify";

export async function logoutAction () {
    //Action to delete user and user data
    deleteItem({key: "userName"})
    deleteItem({key: "budgets"})
    deleteItem({key: "expenses"})

    toast.success("Your account has been successfully deleted!")

    //Redirecting 
    return redirect("/")
} 