import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LockScreen = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('email') || sessionStorage.getItem('email');

  useEffect(() => {
    if (!email) {
      navigate('/auth/login');
    }
  }, [email, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      if (response.data.success) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        history.push('/dashboard');
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="hold-transition register-page">
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
                <button type="submit" className="btn">
                  <i className="fas fa-arrow-right text-muted" />
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="help-block text-center">
          Enter your password to retrieve your session
        </div>
        <div className="text-center">
          <a href="/auth/login">Or sign in as a different user</a>
        </div>
        <div className="lockscreen-footer text-center">
          Copyright © 2014-2021 <b><a href="https://adminlte.io" className="text-black">AdminLTE.io</a></b><br />
          All rights reserved
        </div>
      </div>
    </div>
  );
};

export default LockScreen;
