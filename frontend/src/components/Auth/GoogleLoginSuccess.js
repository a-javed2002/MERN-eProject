import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token); // Save token to local storage
      navigate('/dashboard'); // Redirect to dashboard or desired page
    } else {
      // Handle error or redirect to login page
    }
  }, [navigate]);

  return (
    <div>
      <h2>Login Successful</h2>
    </div>
  );
};

export default LoginSuccess;
