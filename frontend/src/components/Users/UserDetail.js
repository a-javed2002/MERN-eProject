import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetail = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    userId = "665612cf2d30a599cfd3b805";

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}`);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                // Handle error
                setLoading(false);
            }
        };
        fetchUser();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not found.</div>;
    }

    return (
        <div>
            <h2>User Detail</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            {/* Render other user details here */}
        </div>
    );
};

export default UserDetail;
