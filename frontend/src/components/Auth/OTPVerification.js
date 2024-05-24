import React, { useState } from 'react';
import axios from 'axios';

const VerifyOtp = ({ onOtpVerified }) => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/verify-otp', { email, otp });
            if (response.data.success) {
                setMessage(response.data.message);
                setError('');
                onOtpVerified(email);
            } else {
                setMessage('');
                setError(response.data.message);
            }
        } catch (error) {
            setMessage('');
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="hold-transition register-page">
            <div className="login-box">
                <div className="login-logo">
                    <a href="#"><b>Admin</b>LTE</a>
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Verify OTP to Reset Your Password</p>
                        {message && <p className="text-success">{message}</p>}
                        {error && <p className="text-danger">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
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
                                    placeholder="OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-key" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary btn-block">Verify OTP</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;
