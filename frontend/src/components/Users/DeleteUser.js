import React from 'react';
import axios from '../../api/axiosConfig';

const DeleteUser = ({ userId }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`/users/${userId}`);
            console.log('User deleted');
            // Handle successful deletion
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    return (
        <button onClick={handleDelete}>Delete User</button>
    );
};

export default DeleteUser;
