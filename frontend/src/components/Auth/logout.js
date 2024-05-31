// src/components/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../../src/contexts/UserContext';
import React, { useContext } from 'react';

const Logout = () => {
    const navigate = useNavigate();

    //
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
      setUser(null);
      localStorage.removeItem('user');
    };
    //

    console.log("logout...");

    useEffect(() => {
        const logout = async () => {
            try {
                const token = localStorage.getItem('token');

                // Send request to server to invalidate the token
                await axios.post('http://localhost:8080/api/v1/auth/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Remove the token from localStorage
                localStorage.removeItem('token');

                // Redirect to login page
                navigate('/');
            } catch (error) {
                console.error('Error during logout:', error);
                // Optionally, you could handle errors, like redirecting to an error page or showing a notification
            }
        };

        logout();
    }, [navigate]);

    return (
        <div>
            Logging out...
        </div>
    );
};

export default Logout;