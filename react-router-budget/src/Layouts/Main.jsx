import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Errors from '../Pages/Errors';

const Main = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user');
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        setErrorMessage(error.response.data.message); // Adjust this according to your backend error response
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <Errors errorMessage={errorMessage} />;
  }

  return (
    <div className="layout">
      <Navbar userData={userData} />
      <main>
        <Outlet />
      </main>
      {/* Additional components or elements */}
    </div>
  );
};

export default Main;