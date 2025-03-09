import { redirect } from "react-router-dom";
import { logoutUser } from "../../Backend/api";

export async function logoutAction () {
    try {
        // Call the logoutUser function to log out the user on the backend
        await logoutUser(); // This function should handle invalidating the user session or token on the server

        // Display success message
        toast.success("You have been successfully logged out!");

        // Redirect the user to the desired location
        return redirect("/");
    } catch(error) {
        // Display error message
        throw new Error("There was a problem logging you out.");
    }
}