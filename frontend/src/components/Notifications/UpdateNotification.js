import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';

const UpdateNotification = ({ notificationId }) => {
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const response = await axios.get(`/notifications/${notificationId}`);
                setNotification(response.data);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };
        fetchNotification();
    }, [notificationId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/notifications/${notificationId}`, notification);
            console.log(response.data);
            // Handle successful update
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNotification({ ...notification, [name]: value });
    };

    if (!notification) return <div>Loading...</div>;

    return (
        <form onSubmit={handleUpdate}>
            <input
                type="text"
                name="user_id"
                value={notification.user_id}
                onChange={handleChange}
                placeholder="User ID"
                required
            />
            <input
                type="text"
                name="type"
                value={notification.type}
                onChange={handleChange}
                placeholder="Type"
                required
            />
            <input
                type="text"
                name="action"
                value={notification.action}
                onChange={handleChange}
                placeholder="Action"
                required
            />
            <button type="submit">Update Notification</button>
        </form>
    );
};

export default UpdateNotification;
