// React Router Dom imports
import {createBrowserRouter, RouterProvider,} from "react-router-dom";

//Library imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import Main, { mainLoader} from "./Layouts/Main";

// Routes
import Dashboard, {dashboardAction, dashboardLoader} from "./Pages/Dashboard";
import Errors from "./Pages/Errors";
import ExpensePage, {expensesLoader, expenseAction} from "./Pages/ExpensePage";
import BudgetPage, {budgetLoader, budgetAction} from "./Pages/BudgetPage";

// Actions
import { logoutAction } from "./Actions/logout";
import { deleteBudget } from "./Actions/deleteBudget";

const router = createBrowserRouter([
  { 
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Errors />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Errors />,
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Errors />,
        children: [
          {
            path: "delete",
            action: deleteBudget,

          },
        ]
      },
      {
        path: "expenses",
        element: <ExpensePage />,
        loader: expensesLoader,
        action: expenseAction,
        errorElement: <Errors />
      },
      {
        path: "logout",
        action: logoutAction,
      }
    ]
  },
 
]);

function App() {

  return (  
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App