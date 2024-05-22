import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';

const UpdateProgress = ({ progressLogId }) => {
    const [progressLog, setProgressLog] = useState(null);

    useEffect(() => {
        const fetchProgressLog = async () => {
            try {
                const response = await axios.get(`/progress-logs/${progressLogId}`);
                setProgressLog(response.data);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };
        fetchProgressLog();
    }, [progressLogId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/progress-logs/${progressLogId}`, progressLog);
            console.log(response.data);
            // Handle successful update
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProgressLog({ ...progressLog, [name]: value });
    };

    if (!progressLog) return <div>Loading...</div>;

    return (
        <form onSubmit={handleUpdate}>
            <input
                type="date"
                name="date"
                value={progressLog.date}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="weight"
                value={progressLog.weight}
                onChange={handleChange}
                placeholder="Weight"
                min="0"
            />
            <input
                type="number"
                name="chest"
                value={progressLog.body_measurements.chest}
                onChange={(e) => {
                    setProgressLog({
                        ...progressLog,
                        body_measurements: { ...progressLog.body_measurements, chest: e.target.value },
                    });
                }}
                placeholder="Chest"
                min="0"
            />
            <input
                type="number"
                name="waist"
                value={progressLog.body_measurements.waist}
                onChange={(e) => {
                    setProgressLog({
                        ...progressLog,
                        body_measurements: { ...progressLog.body_measurements, waist: e.target.value },
                    });
                }}
                placeholder="Waist"
                min="0"
            />
            <input
                type="number"
                name="hips"
                value={progressLog.body_measurements.hips}
                onChange={(e) => {
                    setProgressLog({
                        ...progressLog,
                        body_measurements: { ...progressLog.body_measurements, hips: e.target.value },
                    });
                }}
                placeholder="Hips"
                min="0"
            />
            <input
                type="number"
                name="run_times"
                value={progressLog.performance_metrics.run_times}
                onChange={(e) => {
                    setProgressLog({
                        ...progressLog,
                        performance_metrics: { ...progressLog.performance_metrics, run_times: e.target.value },
                    });
                }}
                placeholder="Run Times"
                min="0"
            />
            <input
                type="number"
                name="lifting_weights"
                value={progressLog.performance_metrics.lifting_weights}
                onChange={(e) => {
                    setProgressLog({
                        ...progressLog,
                        performance_metrics: { ...progressLog.performance_metrics, lifting_weights: e.target.value },
                    });
                }}
                placeholder="Lifting Weights"
                min="0"
            />
            <button type="submit">Update Progress Log</button>
        </form>
    );
};

export default UpdateProgress;
