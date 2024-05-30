import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmailForm from './EmailForm';
import OtpForm from './OtpForm';
import ResetPasswordForm from './ResetPasswordForm';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('a.javed0202@gmail.com');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/send-otp', { email });
      if (response.data.success) {
        setOtpSent(true);
        toast.success(response.data.message);
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error sending OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/verify-otp', { email, otp });
      if (response.data.success) {
        setOtpVerified(true);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error('Error verifying OTP');
    }
  };

  const resetPassword = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/reset-password', { email, newPassword });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/');
      }
    } catch (error) {
      toast.error('Error resetting password');
    }
  };

  return (
    <div className="hold-transition register-page">
      <ToastContainer />
      <div className="login-box">
        <div className="login-logo">
          <a href="#"><b>Admin</b>LTE</a>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">
              {otpVerified ? 'Reset your password' : otpSent ? 'Enter the OTP sent to your email' : 'You forgot your password?'}
            </p>
            {!otpSent && !otpVerified && (
              <EmailForm email={email} setEmail={setEmail} sendOtp={sendOtp} />
            )}
            {otpSent && !otpVerified && (
              <OtpForm otp={otp} setOtp={setOtp} verifyOtp={verifyOtp} />
            )}
            {otpVerified && (
              <ResetPasswordForm newPassword={newPassword} setNewPassword={setNewPassword} resetPassword={resetPassword} />
            )}
            <p className="mt-3 mb-1">
              <Link to="/auth/">Login</Link>
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

export default ForgetPassword;
