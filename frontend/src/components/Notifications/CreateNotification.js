import React, { useState } from 'react';
import axios from '../../api/axiosConfig';

const CreateNotification = () => {
    const [userId, setUserId] = useState('');
    const [type, setType] = useState('');
    const [action, setAction] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/notifications', {
                user_id: userId,
                type,
                action
            });
            console.log(response.data);
            // Handle successful creation
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="User ID"
                required
            />
            <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Type"
                required
            />
            <input
                type="text"
                value={action}
                onChange={(e) => setAction(e.target.value)}
                placeholder="Action"
                required
            />
            <button type="submit">Create Notification</button>
        </form>
    );
};

export default CreateNotification;
