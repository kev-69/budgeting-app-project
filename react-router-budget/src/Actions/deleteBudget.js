import { toast } from "react-toastify";
import { deleteBudget as deleteBudgetApi } from "../../Backend/api";

export async function deleteBudget({ params }) {
    try {
        // Call the deleteBudgetApi function to delete the budget
        await deleteBudgetApi(params.id);

        // Display success message
        toast.success("Budget deleted successfully.");

        // Redirect the user to the desired location
        return redirect("/"); 
    } catch(e) {
        // Display error message
        throw new Error("There was a problem deleting your budget.");
    }
}