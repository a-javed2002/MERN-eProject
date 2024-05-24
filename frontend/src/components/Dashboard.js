import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';

const MyDashboard = () => {
    const [summaryData, setSummaryData] = useState();

    useEffect(() => {
        const fetchDashboardSummary = async () => {
            try {
                const response = await axios.get('/dashboard/summary');
                setSummaryData(response.data);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };
        fetchDashboardSummary();
    }, []);

    return (
        <div>
            <h2>MyDashboard</h2>
            {summaryData && (
                <div>
                    <h3>Workout Summary</h3>
                    {/* Display summarized data for workouts */}
                    <pre>{JSON.stringify(summaryData.workoutSummary, null, 2)}</pre>

                    <h3>Progress Log Summary</h3>
                    {/* Display summarized data for progress logs */}
                    <pre>{JSON.stringify(summaryData.progressLogSummary, null, 2)}</pre>

                    <h3>Nutrition Log Summary</h3>
                    {/* Display summarized data for nutrition logs */}
                    <pre>{JSON.stringify(summaryData.nutritionLogSummary, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default MyDashboard;
