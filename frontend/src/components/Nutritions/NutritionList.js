import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';

const NutritionList = () => {
    const [nutritionLogs, setNutritionLogs] = useState([]);

    useEffect(() => {
        const fetchNutritionLogs = async () => {
            try {
                const response = await axios.get('/nutrition-logs');
                setNutritionLogs(response.data);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };
        fetchNutritionLogs();
    }, []);

    return (
        <div>
            <h2>Nutrition Log List</h2>
            <ul>
                {nutritionLogs.map((log) => (
                    <li key={log._id}>
                        {log.date} - Meal: {log.meal_type}
                        <ul>
                            {log.foods.map((food, index) => (
                                <li key={index}>
                                    {food.name} - Quantity: {food.quantity} - Calories: {food.calories} - Protein: {food.macros.protein} - Carbs: {food.macros.carbs} - Fat: {food.macros.fat}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NutritionList;
