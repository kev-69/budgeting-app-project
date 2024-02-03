// React router dom imports
import { Outlet, useLoaderData } from "react-router-dom";

// Components imports
import Navbar from "../Components/Navbar";

//Assets imports
import wave from "../assets/wave.svg";

// Helper Functions
import { fetchData } from "../helpers"


// Loaders
export function mainLoader() {
    const userName = fetchData ("userName");
    return { userName }
}

const Main = () => {
    const { userName } = useLoaderData()

  return (
    <div className="layout">  
    <Navbar userName = {userName}/>
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  )
}

export default Main
