import React from 'react';
import axios from '../../api/axiosConfig';

const DeleteWorkout = ({ workoutId }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`/workouts/${workoutId}`);
            console.log('Workout deleted');
            // Handle successful deletion
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    return (
        <button onClick={handleDelete}>Delete Workout</button>
    );
};

export default DeleteWorkout;
