import React, { useState } from 'react';
import axios from '../../api/axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import MyAsideBar from '../Main/aside';
import MyHeader from '../Main/header';

const CreateWorkout = () => {
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [date, setDate] = useState('');
    const [exercises, setExercises] = useState([{ name: '', sets: 1, reps: 1, weights: 0 }]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleExerciseChange = (index, event) => {
        const values = [...exercises];
        values[index][event.target.name] = event.target.value;
        setExercises(values);
    };

    const addExercise = () => {
        setExercises([...exercises, { name: '', sets: 1, reps: 1, weights: 0 }]);
    };

    const removeExercise = (index) => {
        const values = [...exercises];
        values.splice(index, 1);
        setExercises(values);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/workouts', {
                user_id: "665612cf2d30a599cfd3b805",
                date,
                category,
                tags: tags.split(',').map(tag => tag.trim()),
                exercises,
            });
            setSuccessMessage('Workout created successfully!');
            toast.success("Workout created successfully!!");
            setError(null);
            // Reset form
            setCategory('');
            setTags('');
            setDate('');
            setExercises([{ name: '', sets: 1, reps: 1, weights: 0 }]);
        } catch (error) {
            setError('Error creating workout. Please try again.');
            toast.error('Error creating workout. Please try again.');
            setSuccessMessage(null);
            console.error(error);
        }
    };

    return (
        <>
        <MyHeader/>
        <MyAsideBar/>
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
                <div className="container-fluid">
                    <form onSubmit={handleSubmit} className="container mt-5">
                        <ToastContainer />
                        <div className="form-group mb-3">
                            <label htmlFor="date" className="form-label">Date</label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="form-control"
                                placeholder="Date"
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <input
                                type="text"
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="form-control"
                                placeholder="Category"
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="tags" className="form-label">Tags</label>
                            <input
                                type="text"
                                id="tags"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="form-control"
                                placeholder="Tags (comma-separated)"
                                required
                            />
                        </div>
                        {exercises.map((exercise, index) => (
                            <div key={index} className="card mb-3">
                                <div className="card-body">
                                    <div className="form-group mb-3">
                                        <label htmlFor={`name-${index}`} className="form-label">Exercise Name</label>
                                        <input
                                            type="text"
                                            id={`name-${index}`}
                                            name="name"
                                            value={exercise.name}
                                            onChange={(e) => handleExerciseChange(index, e)}
                                            className="form-control"
                                            placeholder="Exercise Name"
                                            required
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label htmlFor={`sets-${index}`} className="form-label">Sets</label>
                                                <input
                                                    type="number"
                                                    id={`sets-${index}`}
                                                    name="sets"
                                                    value={exercise.sets}
                                                    onChange={(e) => handleExerciseChange(index, e)}
                                                    className="form-control"
                                                    placeholder="Sets"
                                                    min="1"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label htmlFor={`reps-${index}`} className="form-label">Reps</label>
                                                <input
                                                    type="number"
                                                    id={`reps-${index}`}
                                                    name="reps"
                                                    value={exercise.reps}
                                                    onChange={(e) => handleExerciseChange(index, e)}
                                                    className="form-control"
                                                    placeholder="Reps"
                                                    min="1"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label htmlFor={`weights-${index}`} className="form-label">Weights</label>
                                                <input
                                                    type="number"
                                                    id={`weights-${index}`}
                                                    name="weights"
                                                    value={exercise.weights}
                                                    onChange={(e) => handleExerciseChange(index, e)}
                                                    className="form-control"
                                                    placeholder="Weights"
                                                    min="0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <button type="button" className="btn btn-danger" onClick={() => removeExercise(index)}>Remove</button>
                                        <button type="button" className="btn btn-primary" onClick={addExercise}>Add Exercise</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button type="submit" className="btn btn-success">Create Workout</button>
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                    </form>
                </div>
            </div>
        </div >
        </>
    );
};

export default CreateWorkout;