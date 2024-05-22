import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';

const ProgressList = () => {
    const [progressLogs, setProgressLogs] = useState([]);

    useEffect(() => {
        const fetchProgressLogs = async () => {
            try {
                const response = await axios.get('/progress-logs');
                setProgressLogs(response.data);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };
        fetchProgressLogs();
    }, []);

    return (
        <div>
            <h2>Progress Log List</h2>
            <ul>
                {progressLogs.map((log) => (
                    <li key={log._id}>
                        {log.date} - Weight: {log.weight} - Chest: {log.body_measurements.chest} - Waist: {log.body_measurements.waist} - Hips: {log.body_measurements.hips} - Run Times: {log.performance_metrics.run_times} - Lifting Weights: {log.performance_metrics.lifting_weights}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProgressList;
