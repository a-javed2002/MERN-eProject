import React, { useState } from 'react';
import axios from '../../api/axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyAsideBar from '../Main/aside';
import MyHeader from '../Main/header';

const CreateProgress = () => {
    const [date, setDate] = useState('');
    const [weight, setWeight] = useState('');
    const [chest, setChest] = useState('');
    const [waist, setWaist] = useState('');
    const [hips, setHips] = useState('');
    const [runTimes, setRunTimes] = useState('');
    const [liftingWeights, setLiftingWeights] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/progress', {
                user_id: "665612cf2d30a599cfd3b805",
                date,
                weight,
                body_measurements: { chest, waist, hips },
                performance_metrics: { run_times: runTimes, lifting_weights: liftingWeights }
            });
            setSuccessMessage('Progress log created successfully!');
            toast.success("Progress log created successfully!!");
            setError(null);
            // Reset form
            setDate('');
            setWeight('');
            setChest('');
            setWaist('');
            setHips('');
            setRunTimes('');
            setLiftingWeights('');
        } catch (error) {
            setError('Error creating progress log. Please try again.');
            toast.error('Error creating progress log. Please try again.');
            setSuccessMessage(null);
            console.error(error);
        }
    };

    return (
        <>
        <MyHeader/>
        <MyAsideBar/>
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <form onSubmit={handleSubmit} className="container mt-5">
                        <ToastContainer />
                        <div className="form-group mb-3">
                            <label htmlFor="date" className="form-label">Date</label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="weight" className="form-label">Weight</label>
                            <input
                                type="number"
                                id="weight"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="form-control"
                                placeholder="Weight"
                                min="0"
                            />
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group mb-3">
                                    <label htmlFor="chest" className="form-label">Chest</label>
                                    <input
                                        type="number"
                                        id="chest"
                                        value={chest}
                                        onChange={(e) => setChest(e.target.value)}
                                        className="form-control"
                                        placeholder="Chest"
                                        min="0"
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-3">
                                    <label htmlFor="waist" className="form-label">Waist</label>
                                    <input
                                        type="number"
                                        id="waist"
                                        value={waist}
                                        onChange={(e) => setWaist(e.target.value)}
                                        className="form-control"
                                        placeholder="Waist"
                                        min="0"
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-3">
                                    <label htmlFor="hips" className="form-label">Hips</label>
                                    <input
                                        type="number"
                                        id="hips"
                                        value={hips}
                                        onChange={(e) => setHips(e.target.value)}
                                        className="form-control"
                                        placeholder="Hips"
                                        min="0"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="runTimes" className="form-label">Run Times</label>
                                    <input
                                        type="number"
                                        id="runTimes"
                                        value={runTimes}
                                        onChange={(e) => setRunTimes(e.target.value)}
                                        className="form-control"
                                        placeholder="Run Times"
                                        min="0"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="liftingWeights" className="form-label">Lifting Weights</label>
                                    <input
                                        type="number"
                                        id="liftingWeights"
                                        value={liftingWeights}
                                        onChange={(e) => setLiftingWeights(e.target.value)}
                                        className="form-control"
                                        placeholder="Lifting Weights"
                                        min="0"
                                    />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success">Create Progress Log</button>
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default CreateProgress;
