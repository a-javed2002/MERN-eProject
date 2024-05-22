import React, { useState } from 'react';
import axios from '../../api/axiosConfig';

const CreateProgress = () => {
    const [userId, setUserId] = useState('');
    const [date, setDate] = useState('');
    const [weight, setWeight] = useState('');
    const [chest, setChest] = useState('');
    const [waist, setWaist] = useState('');
    const [hips, setHips] = useState('');
    const [runTimes, setRunTimes] = useState('');
    const [liftingWeights, setLiftingWeights] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/progress-logs', {
                user_id: userId,
                date,
                weight,
                body_measurements: { chest, waist, hips },
                performance_metrics: { run_times: runTimes, lifting_weights: liftingWeights }
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
            <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Weight"
                min="0"
            />
            <input
                type="number"
                value={chest}
                onChange={(e) => setChest(e.target.value)}
                placeholder="Chest"
                min="0"
            />
            <input
                type="number"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                placeholder="Waist"
                min="0"
            />
            <input
                type="number"
                value={hips}
                onChange={(e) => setHips(e.target.value)}
                placeholder="Hips"
                min="0"
            />
            <input
                type="number"
                value={runTimes}
                onChange={(e) => setRunTimes(e.target.value)}
                placeholder="Run Times"
                min="0"
            />
            <input
                type="number"
                value={liftingWeights}
                onChange={(e) => setLiftingWeights(e.target.value)}
                placeholder="Lifting Weights"
                min="0"
            />
            <button type="submit">Create Progress Log</button>
        </form>
    );
};

export default CreateProgress;
