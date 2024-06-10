import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';
import { Spinner, Alert, Button, Card, Form, InputGroup } from 'react-bootstrap';

const ProgressLogList = ({ userId }) => {
    const [progressLogs, setProgressLogs] = useState([]);
    const [expandedLog, setExpandedLog] = useState(null);
    const [editingProgressLog, setEditingProgressLog] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    userId = "665612cf2d30a599cfd3b805";  // You may want to pass this as a prop or retrieve it dynamically

    useEffect(() => {
        const fetchProgressLogs = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('/progress', { params: { user_id: userId } });
                setProgressLogs(response.data);
            } catch (error) {
                console.error(error);
                setError('Error fetching progress logs. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchProgressLogs();
    }, [userId]);

    const deleteProgressLog = async (id) => {
        try {
            await axios.delete(`/progress/${id}`, { data: { user_id: userId } });
            setProgressLogs(progressLogs.filter(log => log._id !== id));
        } catch (error) {
            console.error(error);
            setError('Error deleting progress log. Please try again.');
        }
    };

    const startEditing = (log) => {
        setEditingProgressLog(log);
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setEditingProgressLog({ ...editingProgressLog, [name]: value });
    };

    const handleNestedChange = (e, field, key) => {
        const { value } = e.target;
        setEditingProgressLog({
            ...editingProgressLog,
            [field]: {
                ...editingProgressLog[field],
                [key]: value
            }
        });
    };

    const saveProgressLog = async () => {
        try {
            const response = await axios.put(`/progress/${editingProgressLog._id}`, editingProgressLog);
            setProgressLogs(progressLogs.map(log => (log._id === editingProgressLog._id ? response.data : log)));
            setEditingProgressLog(null);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Error updating progress log. Please try again.');
        }
    };

    const cancelEditing = () => {
        setEditingProgressLog(null);
        setError(null);
    };

    const toggleExpanded = (logId) => {
        setExpandedLog(expandedLog === logId ? null : logId);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Progress Log List</h2>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            <ul className="list-unstyled">
                {progressLogs.map((log) => (
                    <li key={log._id} className="mb-3">
                        {editingProgressLog && editingProgressLog._id === log._id ? (
                            <Card>
                                <Card.Body>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="date"
                                                value={editingProgressLog.date.split('T')[0]}
                                                onChange={handleUpdateChange}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Weight</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="weight"
                                                value={editingProgressLog.weight}
                                                onChange={handleUpdateChange}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Chest</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="chest"
                                                value={editingProgressLog.body_measurements.chest}
                                                onChange={(e) => handleNestedChange(e, 'body_measurements', 'chest')}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Waist</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="waist"
                                                value={editingProgressLog.body_measurements.waist}
                                                onChange={(e) => handleNestedChange(e, 'body_measurements', 'waist')}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Hips</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="hips"
                                                value={editingProgressLog.body_measurements.hips}
                                                onChange={(e) => handleNestedChange(e, 'body_measurements', 'hips')}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Run Times</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="run_times"
                                                value={editingProgressLog.performance_metrics.run_times}
                                                onChange={(e) => handleNestedChange(e, 'performance_metrics', 'run_times')}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Lifting Weights</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="lifting_weights"
                                                value={editingProgressLog.performance_metrics.lifting_weights}
                                                onChange={(e) => handleNestedChange(e, 'performance_metrics', 'lifting_weights')}
                                                required
                                            />
                                        </Form.Group>
                                        <div className="d-flex justify-content-end">
                                            <Button variant="success" className="me-2" onClick={saveProgressLog}>Save</Button>
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
                                            <Card.Text>Weight: {log.weight}</Card.Text>
                                            {expandedLog === log._id && (
                                                <>
                                                    <Card.Text>Chest: {log.body_measurements.chest}</Card.Text>
                                                    <Card.Text>Waist: {log.body_measurements.waist}</Card.Text>
                                                    <Card.Text>Hips: {log.body_measurements.hips}</Card.Text>
                                                    <Card.Text>Run Times: {log.performance_metrics.run_times}</Card.Text>
                                                    <Card.Text>Lifting Weights: {log.performance_metrics.lifting_weights}</Card.Text>
                                                </>
                                            )}
                                        </div>
                                        <div>
                                            <Button variant="primary" className="me-2" onClick={() => startEditing(log)}>Edit</Button>
                                            <Button variant="danger" className="me-2" onClick={() => deleteProgressLog(log._id)}>Delete</Button>
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

export default ProgressLogList;
