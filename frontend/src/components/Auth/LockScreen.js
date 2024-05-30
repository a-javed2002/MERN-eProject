import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import InternalServerError from '../Extra/InternalServerError';

const LockScreen = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [serverError, setServerError] = useState(false); 
  const navigate = useNavigate();
  const email = localStorage.getItem('email') || sessionStorage.getItem('email');

  useEffect(() => {
    if (!email) {
      navigate('/auth/login');
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the request starts
    try {
      const fcmToken = "rrr"; // Fetch FCM token
      const response = await axios.post('http://localhost:8080/api/v1/auth/login', { email, password, fcmToken });
      if (response.data.success) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        toast.success("Login successful!");
        navigate('/');
      } else {
        toast.error(response.data.message || 'Login failed');
        setError(response.data.message || 'Login failed');
      }
    } catch (error) {
      if (error.response?.status === 505) {
        setServerError(true); // Set server error state
      } else {
        toast.error(error.response?.data?.message || 'An error occurred');
        setError(error.response?.data?.message || 'An error occurred');
        setServerError(true); // Set server error state
      }
    } finally {
      setLoading(false); // Set loading to false when the request is completed
    }
  };

  if (serverError) {
    return <InternalServerError />; // Render the 505 component if server error
  }


  return (
    <div className="hold-transition register-page">
      <ToastContainer />
      <div className="lockscreen-wrapper">
        <div className="lockscreen-logo">
          <a href="#"><b>Admin</b>LTE</a>
        </div>
        <div className="lockscreen-name">{email}</div>
        <div className="lockscreen-item">
          <div className="lockscreen-image">
            <img src="../../dist/img/user1-128x128.jpg" alt="User Image" />
          </div>
          <form className="lockscreen-credentials" onSubmit={handleSubmit}>
            <div className="input-group">
              <input 
                type="password" 
                className="form-control" 
                placeholder="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <div className="input-group-append">
                {loading ? (
                  <div className="myloader"></div> // Show loader when loading
                ) : (
                  <button type="submit" className="btn">
                    <i className="fas fa-arrow-right text-muted" />
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
        {error && <div className="help-block text-center text-danger">{error}</div>}
        <div className="help-block text-center">
          Enter your password to retrieve your session
        </div>
        <div className="text-center">
          <a href="/auth/">Or sign in as a different user</a>
        </div>
        <div className="lockscreen-footer text-center">
          Copyright © 2024 <b><a href="https://adminlte.io" className="text-black">Gym.io</a></b><br />
          All rights reserved
        </div>
      </div>
    </div>
  );
};

export default LockScreen;
