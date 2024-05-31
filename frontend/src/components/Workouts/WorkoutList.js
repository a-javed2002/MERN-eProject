import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';
import { Spinner, Alert, Button, Card, Form, InputGroup } from 'react-bootstrap';

const WorkoutList = ({ userId }) => {
    const [workouts, setWorkouts] = useState([]);
    const [editingWorkout, setEditingWorkout] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    userId = "665612cf2d30a599cfd3b805";

    useEffect(() => {
        const fetchWorkouts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('/workouts', { params: { user_id: userId } });
                setWorkouts(response.data);
            } catch (error) {
                console.error(error);
                setError('Error fetching workouts. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchWorkouts();
    }, [userId]);

    const deleteWorkout = async (id) => {
        try {
            await axios.delete(`/workouts/${id}`, { data: { user_id: userId } });
            setWorkouts(workouts.filter(workout => workout._id !== id));
        } catch (error) {
            console.error(error);
            setError('Error deleting workout. Please try again.');
        }
    };

    const startEditing = (workout) => {
        setEditingWorkout({ ...workout, tags: workout.tags.join(',') });
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setEditingWorkout({ ...editingWorkout, [name]: value });
    };

    const handleExerciseChange = (index, event) => {
        const { name, value } = event.target;
        const exercises = [...editingWorkout.exercises];
        exercises[index][name] = value;
        setEditingWorkout({ ...editingWorkout, exercises });
    };

    const addExercise = () => {
        setEditingWorkout({
            ...editingWorkout,
            exercises: [...editingWorkout.exercises, { name: '', sets: 1, reps: 1, weights: 0 }]
        });
    };

    const removeExercise = (index) => {
        const exercises = [...editingWorkout.exercises];
        exercises.splice(index, 1);
        setEditingWorkout({ ...editingWorkout, exercises });
    };

    const saveWorkout = async () => {
        try {
            const updatedWorkout = {
                ...editingWorkout,
                tags: editingWorkout.tags.split(',').map(tag => tag.trim()),
            };
            const response = await axios.put(`/workouts/${editingWorkout._id}`, updatedWorkout);
            setWorkouts(workouts.map(workout => (workout._id === editingWorkout._id ? response.data : workout)));
            setEditingWorkout(null);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Error updating workout. Please try again.');
        }
    };

    const cancelEditing = () => {
        setEditingWorkout(null);
        setError(null);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Workout List</h2>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            <ul className="list-unstyled">
                {workouts.map((workout) => (
                    <li key={workout._id} className="mb-3">
                        {editingWorkout && editingWorkout._id === workout._id ? (
                            <Card>
                                <Card.Body>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="category"
                                                value={editingWorkout.category}
                                                onChange={handleUpdateChange}
                                                placeholder="Category"
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Tags</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="tags"
                                                value={editingWorkout.tags}
                                                onChange={handleUpdateChange}
                                                placeholder="Tags (comma-separated)"
                                                required
                                            />
                                        </Form.Group>
                                        {editingWorkout.exercises.map((exercise, index) => (
                                            <div key={index} className="mb-3">
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        type="text"
                                                        name="name"
                                                        value={exercise.name}
                                                        onChange={(e) => handleExerciseChange(index, e)}
                                                        placeholder="Exercise Name"
                                                        required
                                                    />
                                                </InputGroup>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        type="number"
                                                        name="sets"
                                                        value={exercise.sets}
                                                        onChange={(e) => handleExerciseChange(index, e)}
                                                        placeholder="Sets"
                                                        min="1"
                                                        required
                                                    />
                                                </InputGroup>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        type="number"
                                                        name="reps"
                                                        value={exercise.reps}
                                                        onChange={(e) => handleExerciseChange(index, e)}
                                                        placeholder="Reps"
                                                        min="1"
                                                        required
                                                    />
                                                </InputGroup>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        type="number"
                                                        name="weights"
                                                        value={exercise.weights}
                                                        onChange={(e) => handleExerciseChange(index, e)}
                                                        placeholder="Weights"
                                                        min="0"
                                                    />
                                                </InputGroup>
                                                <div className="d-flex justify-content-end">
                                                    <Button variant="danger" className="me-2" onClick={() => removeExercise(index)}>Remove</Button>
                                                </div>
                                            </div>
                                        ))}
                                        <Button variant="primary" className="mb-3" onClick={addExercise}>Add Exercise</Button>
                                        <div className="d-flex justify-content-end">
                                            <Button variant="success" className="me-2" onClick={saveWorkout}>Save</Button>
                                            <Button variant="secondary" onClick={cancelEditing}>Cancel</Button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        ) : (
                            <Card>
                                <Card.Body className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <Card.Title>{workout.category}</Card.Title>
                                        <Card.Text>{workout.tags.join(', ')}</Card.Text>
                                    </div>
                                    <div>
                                        <Button variant="primary" className="me-2" onClick={() => startEditing(workout)}>Edit</Button>
                                        <Button variant="danger" onClick={() => deleteWorkout(workout._id)}>Delete</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WorkoutList;
