import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';

const WorkoutList = () => {
    const [workouts, setWorkouts] = useState([]);
    const [editingWorkout, setEditingWorkout] = useState(null);

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

    const deleteWorkout = async (id) => {
        try {
            await axios.delete(`/workouts/${id}`);
            setWorkouts(workouts.filter(workout => workout._id !== id));
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const startEditing = (workout) => {
        setEditingWorkout({ ...workout });
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setEditingWorkout({ ...editingWorkout, [name]: value });
    };

    const saveWorkout = async () => {
        try {
            const response = await axios.put(`/workouts/${editingWorkout._id}`, editingWorkout);
            setWorkouts(workouts.map(workout => (workout._id === editingWorkout._id ? response.data : workout)));
            setEditingWorkout(null);
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const cancelEditing = () => {
        setEditingWorkout(null);
    };

    return (
        <div>
            <h2>Workout List</h2>
            <ul>
                {workouts.map((workout) => (
                    <li key={workout._id}>
                        {editingWorkout && editingWorkout._id === workout._id ? (
                            <div>
                                <input
                                    type="text"
                                    name="category"
                                    value={editingWorkout.category}
                                    onChange={handleUpdateChange}
                                    placeholder="Category"
                                    required
                                />
                                <input
                                    type="text"
                                    name="tags"
                                    value={editingWorkout.tags.join(',')}
                                    onChange={handleUpdateChange}
                                    placeholder="Tags (comma-separated)"
                                    required
                                />
                                {/* Add inputs for exercises if necessary */}
                                <button onClick={saveWorkout}>Save</button>
                                <button onClick={cancelEditing}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                {workout.category} - {workout.tags.join(', ')}
                                <button onClick={() => startEditing(workout)}>Edit</button>
                                <button onClick={() => deleteWorkout(workout._id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WorkoutList;
