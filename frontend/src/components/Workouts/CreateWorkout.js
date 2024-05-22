import React, { useState } from 'react';
import axios from '../../api/axiosConfig';

const CreateWorkout = () => {
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [exercises, setExercises] = useState([{ name: '', sets: 1, reps: 1, weights: 0 }]);

    const handleExerciseChange = (index, event) => {
        const values = [...exercises];
        values[index][event.target.name] = event.target.value;
        setExercises(values);
    };

    const addExercise = () => {
        setExercises([...exercises, { name: '', sets: 1, reps: 1, weights: 0 }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/workouts', {
                category,
                tags: tags.split(','),
                exercises,
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                required
            />
            <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Tags (comma-separated)"
                required
            />
            {exercises.map((exercise, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="name"
                        value={exercise.name}
                        onChange={(e) => handleExerciseChange(index, e)}
                        placeholder="Exercise Name"
                        required
                    />
                    <input
                        type="number"
                        name="sets"
                        value={exercise.sets}
                        onChange={(e) => handleExerciseChange(index, e)}
                        placeholder="Sets"
                        min="1"
                        required
                    />
                    <input
                        type="number"
                        name="reps"
                        value={exercise.reps}
                        onChange={(e) => handleExerciseChange(index, e)}
                        placeholder="Reps"
                        min="1"
                        required
                    />
                    <input
                        type="number"
                        name="weights"
                        value={exercise.weights}
                        onChange={(e) => handleExerciseChange(index, e)}
                        placeholder="Weights"
                        min="0"
                    />
                </div>
            ))}
            <button type="button" onClick={addExercise}>Add Exercise</button>
            <button type="submit">Create Workout</button>
        </form>
    );
};

export default CreateWorkout;
