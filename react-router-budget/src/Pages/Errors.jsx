// React auto imports
import React from 'react'

//React Router Dom imports
import { Link, useNavigate, useRouteError } from 'react-router-dom'

//Heroicon library imports
import { HomeIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline'

const Errors = () => {
    const error = useRouteError ();
    const navigate = useNavigate ();

  return (
    <div className="error"> 
        <h2>Sorry, we've got a problem.</h2>
        <p>{error.message || error.statusText}</p>

        <div className="flex-md">
            <button className="btn btn--dark" onClick={() => navigate(-1)}>
                <span>Back</span>
                <ArrowUturnLeftIcon width={20}/>
            </button>
            <Link to="/" className="btn btn--dark" >
                <span>Home</span>
                <HomeIcon width={20}/>
            </Link>
        </div>
    </div>
  )
}

export default Errors