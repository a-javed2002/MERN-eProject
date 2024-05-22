import React from 'react';
import axios from '../../api/axiosConfig';

const DeleteSupport = ({ supportId }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`/support/${supportId}`);
            console.log('Support request deleted');
            // Handle successful deletion
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    return (
        <button onClick={handleDelete}>Delete Support Request</button>
    );
};

export default DeleteSupport;
