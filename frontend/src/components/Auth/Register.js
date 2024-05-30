import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import InternalServerError from '../Extra/InternalServerError';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [serverError, setServerError] = useState(false); 
  const navigate = useNavigate();

  const validateFields = () => {
    if (!name || !email || !username || !password || !confirmPassword) {
      toast.error("All fields are required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (!terms) {
      toast.error("You must agree to the terms and conditions");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setLoading(true); // Set loading to true when the request starts
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
        name,
        email,
        username,
        password,
      });
      if (response.data.success) {
        toast.success("Registration successful!");
        navigate('/auth/');
      } else {
        toast.error(response.data.message || "Registration failed");
        setError(response.data.message || "Registration failed");
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
      <div className="register-box">
        <div className="register-logo">
          <a href="#"><b>Admin</b>LTE</a>
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Register a new membership</p>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Full name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
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
                  type="text" 
                  className="form-control" 
                  placeholder="Username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
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
              <div className="input-group mb-3">
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Retype password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
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
                      id="agreeTerms" 
                      name="terms" 
                      checked={terms} 
                      onChange={(e) => setTerms(e.target.checked)} 
                    />
                    <label htmlFor="agreeTerms">
                      I agree to the <a href="#">terms</a>
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  {loading ? (
                    <div className="myloader"></div> // Show loader when loading
                  ) : (
                    <button type="submit" className="btn btn-primary btn-block">Register</button>
                  )}
                </div>
              </div>
            </form>
            <div className="social-auth-links text-center">
              <p>- OR -</p>
              <a href="#" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2" />
                Sign up using Facebook
              </a>
              <a href="#" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2" />
                Sign up using Google+
              </a>
            </div>
            <Link to="/auth/" className="text-center">I already have a membership</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
