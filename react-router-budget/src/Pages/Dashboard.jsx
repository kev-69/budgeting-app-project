// React router dom imports
import { useLoaderData } from "react-router-dom";

// Helper Functions
import { fetchData } from "../helpers"

// Loaders
export function dashboardLoader() {
    const userName = fetchData ("userName");
    return { userName }
}

const Dashboard = () => {
    const { userName } = useLoaderData()

  return (
    <div>   
      
    </div>
  )
}

export default Dashboard
