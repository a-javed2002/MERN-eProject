import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Dashboard from '../../pages/dashboard.js';
import Login from './Login.js';
import LockScreen from './LockScreen.js';
import MyDashboard from '../Dashboard.js';

const AuthRoute = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const email = localStorage.getItem('email') || sessionStorage.getItem('email');

  if (token) {
    return <MyDashboard />;
  } else if (email) {
    return <LockScreen />;
  } else {
    return <Login />;
  }
};

export default AuthRoute;
