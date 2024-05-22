import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';

const WorkoutList = () => {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await axios.get('/workouts');
                setWorkouts(response.data);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };
        fetchWorkouts();
    }, []);

    return (
        <div>
            <h2>Workout List</h2>
            <ul>
                {workouts.map((workout) => (
                    <li key={workout._id}>{workout.category} - {workout.tags.join(', ')}</li>
                ))}
            </ul>
        </div>
    );
};

export default WorkoutList;
