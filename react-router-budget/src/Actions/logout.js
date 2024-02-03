import { redirect } from "react-router-dom";

// Helpers
import { deleteItem } from "../helpers";

export async function logoutAction () {
    //Action to delete user
    deleteItem({key: userName})

    //Action to redirect
    return redirect("/")
} 