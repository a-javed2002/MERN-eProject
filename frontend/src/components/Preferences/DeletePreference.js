import React from 'react';
import axios from '../../api/axiosConfig';

const DeletePreference = ({ preferenceId }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`/preferences/${preferenceId}`);
            console.log('Preference deleted');
            // Handle successful deletion
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    return (
        <button onClick={handleDelete}>Delete Preference</button>
    );
};

export default DeletePreference;
