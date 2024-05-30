import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Dashboard from '../../pages/dashboard.js';
import Login from './Login.js';
import LockScreen from './LockScreen.js';

const AuthRoute = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const email = localStorage.getItem('email');

  if (token) {
    return <Dashboard />;
  } else if (email) {
    return <LockScreen />;
  } else {
    return <Login />;
  }
};

export default AuthRoute;
