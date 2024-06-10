import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';

const UpdateNutrition = ({ nutritionId }) => {
    const [nutrition, setNutrition] = useState(null);

    useEffect(() => {
        const fetchNutrition = async () => {
            try {
                const response = await axios.get(`/nutritions/${nutritionId}`);
                setNutrition(response.data);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };
        fetchNutrition();
    }, [nutritionId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/nutritions/${nutritionId}`, nutrition);
            console.log(response.data);
            // Handle successful update
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNutrition({ ...nutrition, [name]: value });
    };

    if (!nutrition) return <div>Loading...</div>;

    return (
        <form onSubmit={handleUpdate}>
            <input
                type="date"
                name="date"
                value={nutrition.date}
                onChange={handleChange}
                placeholder="Date"
                required
            />
            <input
                type="text"
                name="meal_type"
                value={nutrition.meal_type}
                onChange={handleChange}
                placeholder="Meal Type"
                required
            />
            {nutrition.foods.map((food, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="name"
                        value={food.name}
                        onChange={(e) => {
                            const updatedFoods = nutrition.foods.map((fd, i) =>
                                i === index ? { ...fd, name: e.target.value } : fd
                            );
                            setNutrition({ ...nutrition, foods: updatedFoods });
                        }}
                        placeholder="Food Name"
                        required
                    />
                    <input
                        type="number"
                        name="quantity"
                        value={food.quantity}
                        onChange={(e) => {
                            const updatedFoods = nutrition.foods.map((fd, i) =>
                                i === index ? { ...fd, quantity: e.target.value } : fd
                            );
                            setNutrition({ ...nutrition, foods: updatedFoods });
                        }}
                        placeholder="Quantity"
                        min="1"
                        required
                    />
                    <input
                        type="number"
                        name="calories"
                        value={food.calories}
                        onChange={(e) => {
                            const updatedFoods = nutrition.foods.map((fd, i) =>
                                i === index ? { ...fd, calories: e.target.value } : fd
                            );
                            setNutrition({ ...nutrition, foods: updatedFoods });
                        }}
                        placeholder="Calories"
                        min="0"
                        required
                    />
                    {/* Add more input fields for other food properties like macros if needed */}
                </div>
            ))}
            <button type="submit">Update Nutrition</button>
        </form>
    );
};

export default UpdateNutrition;
