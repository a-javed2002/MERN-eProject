import React, { useState } from 'react';
import axios from '../../api/axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyAsideBar from '../Main/aside';
import MyHeader from '../Main/header';

const CreateNutrition = () => {
    const [mealType, setMealType] = useState('');
    const [foods, setFoods] = useState([{ name: '', quantity: 0, calories: 0, macros: { protein: 0, carbs: 0, fat: 0 } }]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleFoodChange = (index, event) => {
        const values = [...foods];
        const { name, value } = event.target;
        if (name in values[index]) {
            values[index][name] = value;
        } else {
            values[index].macros[name] = value;
        }
        setFoods(values);
    };

    const addFood = () => {
        setFoods([...foods, { name: '', quantity: 0, calories: 0, macros: { protein: 0, carbs: 0, fat: 0 } }]);
    };

    const removeFood = (index) => {
        const values = [...foods];
        values.splice(index, 1);
        setFoods(values);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/nutritions', {
                user_id: "665612cf2d30a599cfd3b805",
                meal_type: mealType,
                foods,
            });
            setSuccessMessage('Nutrition log created successfully!');
            toast.success("Nutrition log created successfully!!");
            setError(null);
            // Reset form
            setMealType('');
            setFoods([{ name: '', quantity: 0, calories: 0, macros: { protein: 0, carbs: 0, fat: 0 } }]);
        } catch (error) {
            setError('Error creating nutrition log. Please try again.');
            toast.error('Error creating nutrition log. Please try again.');
            setSuccessMessage(null);
            console.error(error);
        }
    };

    return (
        <>
            <MyHeader />
            <MyAsideBar />
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <form onSubmit={handleSubmit} className="container mt-5">
                            <ToastContainer />
                            <div className="form-group mb-3">
                                <label htmlFor="mealType" className="form-label">Meal Type</label>
                                <select
                                    id="mealType"
                                    value={mealType}
                                    onChange={(e) => setMealType(e.target.value)}
                                    className="form-control"
                                    required
                                >
                                    <option value="">Select Meal Type</option>
                                    <option value="breakfast">Breakfast</option>
                                    <option value="lunch">Lunch</option>
                                    <option value="dinner">Dinner</option>
                                    <option value="snacks">Snacks</option>
                                </select>
                            </div>
                            {foods.map((food, index) => (
                                <div key={index} className="card mb-3">
                                    <div className="card-body">
                                        <div className="form-group mb-3">
                                            <label htmlFor={`foodName-${index}`} className="form-label">Food Name</label>
                                            <input
                                                type="text"
                                                id={`foodName-${index}`}
                                                name="name"
                                                value={food.name}
                                                onChange={(e) => handleFoodChange(index, e)}
                                                className="form-control"
                                                placeholder="Food Name"
                                                required
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor={`foodQuantity-${index}`} className="form-label">Quantity</label>
                                            <input
                                                type="number"
                                                id={`foodQuantity-${index}`}
                                                name="quantity"
                                                value={food.quantity}
                                                onChange={(e) => handleFoodChange(index, e)}
                                                className="form-control"
                                                placeholder="Quantity"
                                                min="0"
                                                required
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor={`foodCalories-${index}`} className="form-label">Calories</label>
                                            <input
                                                type="number"
                                                id={`foodCalories-${index}`}
                                                name="calories"
                                                value={food.calories}
                                                onChange={(e) => handleFoodChange(index, e)}
                                                className="form-control"
                                                placeholder="Calories"
                                                min="0"
                                                required
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">Macros</label>
                                            <div className="d-flex">
                                                <input
                                                    type="number"
                                                    name="protein"
                                                    value={food.macros.protein}
                                                    onChange={(e) => handleFoodChange(index, e)}
                                                    className="form-control me-2"
                                                    placeholder="Protein"
                                                    min="0"
                                                />
                                                <input
                                                    type="number"
                                                    name="carbs"
                                                    value={food.macros.carbs}
                                                    onChange={(e) => handleFoodChange(index, e)}
                                                    className="form-control me-2"
                                                    placeholder="Carbs"
                                                    min="0"
                                                />
                                                <input
                                                    type="number"
                                                    name="fat"
                                                    value={food.macros.fat}
                                                    onChange={(e) => handleFoodChange(index, e)}
                                                    className="form-control"
                                                    placeholder="Fat"
                                                    min="0"
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <button type="button" className="btn btn-danger" onClick={() => removeFood(index)}>Remove</button>
                                            {index === foods.length - 1 && (
                                                <button type="button" className="btn btn-primary" onClick={addFood}>Add Food</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button type="submit" className="btn btn-success">Create Nutrition Log</button>
                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateNutrition;
