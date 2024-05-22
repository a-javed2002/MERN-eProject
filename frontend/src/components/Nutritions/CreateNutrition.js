import React, { useState } from 'react';
import axios from '../../api/axiosConfig';

const CreateNutrition = () => {
    const [userId, setUserId] = useState('');
    const [date, setDate] = useState('');
    const [mealType, setMealType] = useState('');
    const [foods, setFoods] = useState([{ name: '', quantity: 0, calories: 0, macros: { protein: 0, carbs: 0, fat: 0 } }]);

    const handleFoodChange = (index, event) => {
        const values = [...foods];
        if (event.target.name === 'name') {
            values[index].name = event.target.value;
        } else if (event.target.name === 'quantity') {
            values[index].quantity = event.target.value;
        } else if (event.target.name === 'calories') {
            values[index].calories = event.target.value;
        } else {
            values[index].macros[event.target.name] = event.target.value;
        }
        setFoods(values);
    };

    const handleAddFood = () => {
        setFoods([...foods, { name: '', quantity: 0, calories: 0, macros: { protein: 0, carbs: 0, fat: 0 } }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/nutrition-logs', {
                user_id: userId,
                date,
                meal_type: mealType,
                foods
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
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="User ID"
                required
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <select value={mealType} onChange={(e) => setMealType(e.target.value)} required>
                <option value="">Select Meal Type</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snacks">Snacks</option>
            </select>
            {foods.map((food, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="name"
                        value={food.name}
                        onChange={(e) => handleFoodChange(index, e)}
                        placeholder="Food Name"
                        required
                    />
                    <input
                        type="number"
                        name="quantity"
                        value={food.quantity}
                        onChange={(e) => handleFoodChange(index, e)}
                        placeholder="Quantity"
                        min="0"
                        required
                    />
                    <input
                        type="number"
                        name="calories"
                        value={food.calories}
                        onChange={(e) => handleFoodChange(index, e)}
                        placeholder="Calories"
                        min="0"
                        required
                    />
                    <input
                        type="number"
                        name="protein"
                        value={food.macros.protein}
                        onChange={(e) => handleFoodChange(index, e)}
                        placeholder="Protein"
                        min="0"
                    />
                    <input
                        type="number"
                        name="carbs"
                        value={food.macros.carbs}
                        onChange={(e) => handleFoodChange(index, e)}
                        placeholder="Carbs"
                        min="0"
                    />
                    <input
                        type="number"
                        name="fat"
                        value={food.macros.fat}
                        onChange={(e) => handleFoodChange(index, e)}
                        placeholder="Fat"
                        min="0"
                    />
                </div>
            ))}
            <button type="button" onClick={handleAddFood}>Add Food</button>
            <button type="submit">Create Nutrition Log</button>
        </form>
    );
};

export default CreateNutrition;
