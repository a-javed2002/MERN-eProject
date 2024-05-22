import React from 'react';
import axios from '../../api/axiosConfig';

const DeleteNotification = ({ notificationId }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`/notifications/${notificationId}`);
            console.log('Notification deleted');
            // Handle successful deletion
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    return (
        <button onClick={handleDelete}>Delete Notification</button>
    );
};

export default DeleteNotification;
