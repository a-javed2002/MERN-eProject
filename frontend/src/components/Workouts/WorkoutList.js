import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';
import { Spinner, Alert, Button, Card, Form } from 'react-bootstrap';

const WorkoutLogList = ({ userId }) => {
    const [workoutLogs, setWorkoutLogs] = useState([]);
    const [expandedLog, setExpandedLog] = useState(null);
    const [editingWorkoutLog, setEditingWorkoutLog] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    userId = "665612cf2d30a599cfd3b805"; // You may want to pass this as a prop or retrieve it dynamically

    useEffect(() => {
        const fetchWorkoutLogs = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('/workouts', { params: { user_id: userId } });
                setWorkoutLogs(response.data);
            } catch (error) {
                console.error(error);
                setError('Error fetching workout logs. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchWorkoutLogs();
    }, [userId]);

    const deleteWorkoutLog = async (id) => {
        try {
            await axios.delete(`/workouts/${id}`, { data: { user_id: userId } });
            setWorkoutLogs(workoutLogs.filter(log => log._id !== id));
        } catch (error) {
            console.error(error);
            setError('Error deleting workout log. Please try again.');
        }
    };

    const startEditing = (log) => {
        setEditingWorkoutLog(log);
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setEditingWorkoutLog({ ...editingWorkoutLog, [name]: value });
    };

    const handleNestedChange = (e, field, index, key) => {
        const { value } = e.target;
        const updatedExercises = editingWorkoutLog.exercises.map((exercise, idx) =>
            idx === index ? { ...exercise, [key]: value } : exercise
        );
        setEditingWorkoutLog({ ...editingWorkoutLog, exercises: updatedExercises });
    };

    const saveWorkoutLog = async () => {
        try {
            const response = await axios.put(`/workouts/${editingWorkoutLog._id}`, editingWorkoutLog);
            setWorkoutLogs(workoutLogs.map(log => (log._id === editingWorkoutLog._id ? response.data : log)));
            setEditingWorkoutLog(null);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Error updating workout log. Please try again.');
        }
    };

    const cancelEditing = () => {
        setEditingWorkoutLog(null);
        setError(null);
    };

    const toggleExpanded = (logId) => {
        setExpandedLog(expandedLog === logId ? null : logId);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Workout Log List</h2>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            <ul className="list-unstyled">
                {workoutLogs.map((log) => (
                    <li key={log._id} className="mb-3">
                        {editingWorkoutLog && editingWorkoutLog._id === log._id ? (
                            <Card>
                                <Card.Body>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="date"
                                                value={editingWorkoutLog.date.split('T')[0]}
                                                onChange={handleUpdateChange}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="category"
                                                value={editingWorkoutLog.category}
                                                onChange={handleUpdateChange}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Tags</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="tags"
                                                value={editingWorkoutLog.tags.join(', ')}
                                                onChange={handleUpdateChange}
                                                required
                                            />
                                        </Form.Group>
                                        {editingWorkoutLog.exercises.map((exercise, index) => (
                                            <div key={exercise._id}>
                                                <h5>Exercise {index + 1}</h5>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="name"
                                                        value={exercise.name}
                                                        onChange={(e) => handleNestedChange(e, 'exercises', index, 'name')}
                                                        required
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Sets</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        name="sets"
                                                        value={exercise.sets}
                                                        onChange={(e) => handleNestedChange(e, 'exercises', index, 'sets')}
                                                        required
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Reps</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        name="reps"
                                                        value={exercise.reps}
                                                        onChange={(e) => handleNestedChange(e, 'exercises', index, 'reps')}
                                                        required
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Weights</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        name="weights"
                                                        value={exercise.weights}
                                                        onChange={(e) => handleNestedChange(e, 'exercises', index, 'weights')}
                                                        required
                                                    />
                                                </Form.Group>
                                            </div>
                                        ))}
                                        <div className="d-flex justify-content-end">
                                            <Button variant="success" className="me-2" onClick={saveWorkoutLog}>Save</Button>
                                            <Button variant="secondary" onClick={cancelEditing}>Cancel</Button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        ) : (
                            <Card>
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <Card.Title>{log.date.split('T')[0]}</Card.Title>
                                            <Card.Text>Category: {log.category}</Card.Text>
                                            {expandedLog === log._id && (
                                                <>
                                                    <Card.Text>Tags: {log.tags.join(', ')}</Card.Text>
                                                    {log.exercises.map((exercise, index) => (
                                                        <div key={exercise._id}>
                                                            <Card.Text>Exercise {index + 1}:</Card.Text>
                                                            <Card.Text>Name: {exercise.name}</Card.Text>
                                                            <Card.Text>Sets: {exercise.sets}</Card.Text>
                                                            <Card.Text>Reps: {exercise.reps}</Card.Text>
                                                            <Card.Text>Weights: {exercise.weights}</Card.Text>
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </div>
                                        <div>
                                            <Button variant="primary" className="me-2" onClick={() => startEditing(log)}>Edit</Button>
                                            <Button variant="danger" className="me-2" onClick={() => deleteWorkoutLog(log._id)}>Delete</Button>
                                            <Button variant="info" onClick={() => toggleExpanded(log._id)}>
                                                {expandedLog === log._id ? 'See Less' : 'See More'}
                                            </Button>
                                        </div>
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

export default WorkoutLogList;
