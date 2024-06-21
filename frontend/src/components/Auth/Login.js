import React, { useState,useEffect, useContext } from 'react';
import { UserContext } from '../../../src/contexts/UserContext.js';
import { Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { messaging } from '../../api/firebase.js'; // Import the messaging object
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import InternalServerError from '../Extra/InternalServerError.js';

const Login = () => {
  const [email, setEmail] = useState('a.javed0202@gmail.com');
  const [password, setPassword] = useState('123');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [serverError, setServerError] = useState(false); 
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    toast.success("Welcome");
    // Fetch FCM token when the component mounts
    const fetchFcmToken = async () => {
      try {
        const token = await messaging.getToken();
        console.log("FCM Token:", token);
        // You can set the FCM token to state here if needed
      } catch (error) {
        console.error('Error fetching FCM token:', error);
      }
    };

    fetchFcmToken();

    // Clean up any subscriptions or resources if necessary
    return () => {
      // Cleanup logic here
    };
  }, []); // Empty dependency array to run only once when the component mounts

  const handleGoogleLogin = () => {
    window.location.href = '/auth/google'; // Redirect to backend Google OAuth route
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the request starts
    try {
      // const fcmToken = await messaging.getToken(); // Fetch FCM token
      const fcmToken = "rrr"; // Fetch FCM token
      const response = await axios.post('http://localhost:8080/api/v1/auth/login', { email, password,fcmToken });
      if (response.data.success) {
        const { token,role } = response.data;
        if (remember) {
          localStorage.setItem('token', token);
          localStorage.setItem('email', email);
          localStorage.setItem('role', role);
        } else {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('role', role);
        }
        setUser(response.data);
        console.log(response.data);
        toast.success("Login successful!");
        // navigate('/');
        window.location.href = '/';
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
      <div className="login-box">
        <div className="login-logo">
          <a href="#"><b>GYM</b>Freak</a>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            {error && <p className="text-danger">{error}</p>}
            {/* {loading && <div className="myloader">Loading...</div>} */}
            
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input 
                      type="checkbox" 
                      id="remember" 
                      checked={remember} 
                      onChange={(e) => setRemember(e.target.checked)} 
                    />
                    <label htmlFor="remember">
                      Remember Me
                    </label>
                  </div>
                </div>
                <div className="col-4">
                {loading ? (
                    <div className="myloader"></div> // Show loader when loading
                  ) : (
                    <button type="submit" className="btn btn-primary btn-block">Sign In</button> // Show button when not loading
                  )}
                </div>
              </div>
            </form>
            <div className="social-auth-links text-center mb-3">
              <p>- OR -</p>
              <a href="#" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2" /> Sign in using Facebook
              </a>
              <a href="#" className="btn btn-block btn-danger" onClick={handleGoogleLogin}>
                <i className="fab fa-google-plus mr-2" /> Sign in using Google+
              </a>
            </div>
            <p className="mb-1">
              <Link to="/auth/forget-password">I forgot my password</Link>
            </p>
            <p className="mb-0">
              <Link to="/auth/register" className="text-center">Register a new membership</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
