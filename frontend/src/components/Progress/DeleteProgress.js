import React from 'react';
import axios from '../../api/axiosConfig';

const DeleteProgress = ({ progressLogId }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`/progress-logs/${progressLogId}`);
            console.log('Progress Log deleted');
            // Handle successful deletion
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    return (
        <button onClick={handleDelete}>Delete Progress Log</button>
    );
};

export default DeleteProgress;
