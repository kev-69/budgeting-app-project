import React, { useState } from 'react';
import { signUp } from '../../Backend/api';
import illustration from '../assets/illustration.jog'

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Make API call to sign up the user
      await signUp(formData);
      setSuccessMessage('Account created successfully!');
      // Optionally, you can redirect the user to another page after successful signup
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="intro">
      <div>
        <h1>Take Control Of <span className="accent">Your Money</span></h1>
        <p>Personal budgeting is the freedom to financial freedom. Start your journey today</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            required
            placeholder="What's your name?"
            aria-label="Your Name"
            autoComplete="given-name"
            value={formData.userName}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn--dark" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
      <img src={illustration} alt="" />
    </div>
  );
};

export default SignUp;