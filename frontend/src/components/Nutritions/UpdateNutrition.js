import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';

const UpdateNutrition = ({ nutritionLogId }) => {
    const [nutritionLog, setNutritionLog] = useState(null);

    useEffect(() => {
        const fetchNutritionLog = async () => {
            try {
                const response = await axios.get(`/nutrition-logs/${nutritionLogId}`);
                setNutritionLog(response.data);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };
        fetchNutritionLog();
    }, [nutritionLogId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/nutrition-logs/${nutritionLogId}`, nutritionLog);
            console.log(response.data);
            // Handle successful update
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    // Similar to CreateNutritionLog, handleFoodChange will handle input changes for food items

    if (!nutritionLog) return <div>Loading...</div>;

    return (
        <form onSubmit={handleUpdate}>
            {/* Input fields similar to CreateNutritionLog */}
        </form>
    );
};

export default UpdateNutrition;
