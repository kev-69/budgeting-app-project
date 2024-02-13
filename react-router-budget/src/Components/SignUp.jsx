// React Router Dom imports
import { Form } from "react-router-dom"

// Heroicons library inports
import { UserPlusIcon } from "@heroicons/react/24/outline"

// Asset imports
import illustration from "../assets/illustration.jpg"

const SignUp = () => {
  return (
    <div className="intro">
      <div>
        <h1>Take Control Of <span className="accent">Your Money</span></h1>
        <p>Personal budgeting is the freedom to financial freedom. Start your journey today</p>
        <Form method="post">
            <input type="text" name="userName" required placeholder="What's your name?" aria-label="Your Name" autoComplete="given-name"/>

            <input type="hidden" name="_action" value="newUser" />

            <button type="submit" className="btn btn--dark">
                <span>Create Account</span>
                <UserPlusIcon width={20}/>
            </button>
        </Form>
      </div>
      <img src={illustration} alt="Person holding money" width={600}/>
    </div>
  )
}

export default SignUp
