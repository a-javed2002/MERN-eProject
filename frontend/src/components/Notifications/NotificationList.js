import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('/notifications');
                setNotifications(response.data);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };
        fetchNotifications();
    }, []);

    return (
        <div>
            <h2>Notification List</h2>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification._id}>
                        User ID: {notification.user_id} - Type: {notification.type} - Action: {notification.action}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationList;
