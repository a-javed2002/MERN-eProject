import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';
import { Spinner, Alert, Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MyHeader from '../Main/header';
import MyAsideBar from '../Main/aside';

const NutritionList = ({ userId }) => {
    const [nutritionLogs, setNutritionLogs] = useState([]);
    const [expandedLog, setExpandedLog] = useState(null);
    const [editingNutritionLog, setEditingNutritionLog] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    userId = "665612cf2d30a599cfd3b805"; // Static user ID for example

    useEffect(() => {
        const fetchNutritionLogs = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('/nutritions', { params: { user_id: userId } });
                setNutritionLogs(response.data);
            } catch (error) {
                console.error(error);
                setError('Error fetching nutrition logs. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchNutritionLogs();
    }, [userId]);

    const deleteNutritionLog = async (id) => {
        try {
            await axios.delete(`/nutrition/${id}`);
            setNutritionLogs(nutritionLogs.filter(log => log._id !== id));
        } catch (error) {
            console.error(error);
            setError('Error deleting nutrition log. Please try again.');
        }
    };

    const startEditing = (log) => {
        setEditingNutritionLog(log);
    };

    const handleUpdateChange = (e, field) => {
        const { value } = e.target;
        setEditingNutritionLog({ ...editingNutritionLog, [field]: value });
    };

    const handleFoodChange = (e, field, foodIndex) => {
        const { value } = e.target;
        const updatedFoods = editingNutritionLog.foods.map((food, index) =>
            index === foodIndex ? { ...food, [field]: value } : food
        );
        setEditingNutritionLog({ ...editingNutritionLog, foods: updatedFoods });
    };

    const saveNutritionLog = async () => {
        try {
            const response = await axios.put(`/nutritions/${editingNutritionLog._id}`, editingNutritionLog);
            setNutritionLogs(nutritionLogs.map(log => (log._id === editingNutritionLog._id ? response.data : log)));
            setEditingNutritionLog(null);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Error updating nutrition log. Please try again.');
        }
    };

    const cancelEditing = () => {
        setEditingNutritionLog(null);
        setError(null);
    };

    const toggleExpanded = (logId) => {
        setExpandedLog(expandedLog === logId ? null : logId);
    };

    return (
        <>
        <MyHeader />
            <MyAsideBar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Calendar</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Calendar</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">

                            <div className="container mt-5">
            <h2 className="mb-4">Nutrition Log List <Link to="/progress/nutritions">Add Nutrition</Link></h2>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            <ul className="list-unstyled">
                {nutritionLogs.map((log) => (
                    <li key={log._id} className="mb-3">
                        {editingNutritionLog && editingNutritionLog._id === log._id ? (
                            <Card>
                                <Card.Body>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Meal Type</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={editingNutritionLog.meal_type}
                                                onChange={(e) => handleUpdateChange(e, 'meal_type')}
                                                required
                                            />
                                        </Form.Group>
                                        {editingNutritionLog.foods.map((food, index) => (
                                            <div key={food._id}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Food Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={food.name}
                                                        onChange={(e) => handleFoodChange(e, 'name', index)}
                                                        required
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Quantity</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        value={food.quantity}
                                                        onChange={(e) => handleFoodChange(e, 'quantity', index)}
                                                        required
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Calories</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        value={food.calories}
                                                        onChange={(e) => handleFoodChange(e, 'calories', index)}
                                                        required
                                                    />
                                                </Form.Group>
                                            </div>
                                        ))}
                                        <div className="d-flex justify-content-end">
                                            <Button variant="success" className="me-2" onClick={saveNutritionLog}>Save</Button>
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
                                            <Card.Title>{new Date(log.date).toLocaleDateString()}</Card.Title>
                                            <Card.Text>Meal Type: {log.meal_type}</Card.Text>
                                            {expandedLog === log._id && (
                                                <>
                                                    {log.foods.map((food) => (
                                                        <div key={food._id}>
                                                            <Card.Text>Food: {food.name}</Card.Text>
                                                            <Card.Text>Quantity: {food.quantity}</Card.Text>
                                                            <Card.Text>Calories: {food.calories}</Card.Text>
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </div>
                                        <div>
                                            <Button variant="primary" className="me-2" onClick={() => startEditing(log)}>Edit</Button>
                                            <Button variant="danger" className="me-2" onClick={() => deleteNutritionLog(log._id)}>Delete</Button>
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
                            </div>
                            </div>
                            </div>
                            </section>
                            </div>
        </>
    );
};

export default NutritionList;
