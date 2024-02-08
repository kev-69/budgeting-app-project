import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//Library imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import Main, { mainLoader} from "./Layouts/Main";

// Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./Pages/Dashboard";
import Errors from "./Pages/Errors";

// Actions
import { logoutAction } from "./Actions/logout";

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
        errorElement: <Errors />
      },
      {
        path: "logout",
        action: logoutAction 
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