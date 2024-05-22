import React from 'react';
import axios from '../../api/axiosConfig';

const DeleteNutrition = ({ nutritionLogId }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`/nutrition-logs/${nutritionLogId}`);
            console.log('Nutrition Log deleted');
            // Handle successful deletion
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    return (
        <button onClick={handleDelete}>Delete Nutrition Log</button>
    );
};

export default DeleteNutrition;
