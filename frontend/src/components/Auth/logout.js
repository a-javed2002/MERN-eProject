// src/components/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                const token = localStorage.getItem('token');

                // Send request to server to invalidate the token
                await axios.post('/api/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Remove the token from localStorage
                localStorage.removeItem('token');

                // Redirect to login page
                navigate('/login');
            } catch (error) {
                console.error('Error during logout:', error);
                // Optionally, you could handle errors, like redirecting to an error page or showing a notification
            }
        };

        logout();
    }, [history]);

    return (
        <div>
            Logging out...
        </div>
    );
};

export default Logout;