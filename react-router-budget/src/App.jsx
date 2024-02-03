import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Layouts
import Main, { mainLoader} from "./Layouts/Main";

// Routes
import Dashboard, { dashboardLoader } from "./Pages/Dashboard";
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
    </div>
  )
}

export default App
