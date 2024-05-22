import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';

const UpdateWorkout = ({ workoutId }) => {
    const [workout, setWorkout] = useState(null);

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const response = await axios.get(`/workouts/${workoutId}`);
                setWorkout(response.data);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };
        fetchWorkout();
    }, [workoutId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/workouts/${workoutId}`, workout);
            console.log(response.data);
            // Handle successful update
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorkout({ ...workout, [name]: value });
    };

    if (!workout) return <div>Loading...</div>;

    return (
        <form onSubmit={handleUpdate}>
            <input
                type="text"
                name="category"
                value={workout.category}
                onChange={handleChange}
                placeholder="Category"
                required
            />
            <input
                type="text"
                name="tags"
                value={workout.tags.join(',')}
                onChange={(e) => setWorkout({ ...workout, tags: e.target.value.split(',') })}
                placeholder="Tags"
                required
            />
            {workout.exercises.map((exercise, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="name"
                        value={exercise.name}
                        onChange={(e) => {
                            const updatedExercises = workout.exercises.map((ex, i) =>
                                i === index ? { ...ex, name: e.target.value } : ex
                            );
                            setWorkout({ ...workout, exercises: updatedExercises });
                        }}
                        placeholder="Exercise Name"
                        required
                    />
                    <input
                        type="number"
                        name="sets"
                        value={exercise.sets}
                        onChange={(e) => {
                            const updatedExercises = workout.exercises.map((ex, i) =>
                                i === index ? { ...ex, sets: e.target.value } : ex
                            );
                            setWorkout({ ...workout, exercises: updatedExercises });
                        }}
                        placeholder="Sets"
                        min="1"
                        required
                    />
                    <input
                        type="number"
                        name="reps"
                        value={exercise.reps}
                        onChange={(e) => {
                            const updatedExercises = workout.exercises.map((ex, i) =>
                                i === index ? { ...ex, reps: e.target.value } : ex
                            );
                            setWorkout({ ...workout, exercises: updatedExercises });
                        }}
                        placeholder="Reps"
                        min="1"
                        required
                    />
                    <input
                        type="number"
                        name="weights"
                        value={exercise.weights}
                        onChange={(e) => {
                            const updatedExercises = workout.exercises.map((ex, i) =>
                                i === index ? { ...ex, weights: e.target.value } : ex
                            );
                            setWorkout({ ...workout, exercises: updatedExercises });
                        }}
                        placeholder="Weights"
                        min="0"
                    />
                </div>
            ))}
            <button type="submit">Update Workout</button>
        </form>
    );
};

export default UpdateWorkout;
