import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from '../../api/axiosConfig';
import { Modal, Button } from 'react-bootstrap';
import MyHeader from '../Main/header';
import MyAsideBar from '../Main/aside';

const CalendarWorkouts = ({ userId }) => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [nutritionDetails, setNutritionDetails] = useState(null);
    const [workoutDetails, setWorkoutDetails] = useState(null);

    useEffect(() => {
        fetchWorkouts();
    }, [userId]);

    const fetchWorkouts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/workouts', { params: { user_id: "665612cf2d30a599cfd3b805" } });
            setWorkouts(response.data);
        } catch (error) {
            console.error(error);
            setError('Error fetching workouts. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const events = workouts.map(workout => ({
        title: `${workout.category} - ${workout.tags.join(', ')}`,
        start: new Date(workout.date),
        backgroundColor: '#0073b7',
        borderColor: '#0073b7',
        id: workout._id,
    }));

    const handleEventClick = (info) => {
        setCurrentEvent(info);
        setShowModal(true);
        const clickedDate = info.dateStr;
        setSelectedDate(clickedDate);
        fetchNutritionDetails(clickedDate);
        fetchWorkoutDetails(clickedDate);
    };

    const fetchNutritionDetails = async (date) => {
        try {
            const response = await axios.get('/nutritions', { params: { user_id: userId, date: date } });
            setNutritionDetails(response.data);
        } catch (error) {
            console.error(error);
            setNutritionDetails(null);
        }
    };

    const fetchWorkoutDetails = async (date) => {
        try {
            const response = await axios.get('/workouts', { params: { user_id: userId, date: date } });
            setWorkoutDetails(response.data);
        } catch (error) {
            console.error(error);
            setWorkoutDetails(null);
        }
    };

    const handleEventDrop = async (info) => {
        setCurrentEvent(info);
        setShowModal(true);
    };

    const handleMove = async () => {
        const { id, start } = currentEvent.event;
        const workout = workouts.find(workout => workout._id === id);

        if (workout) {
            try {
                const response = await axios.put(`/workouts/${id}`, { ...workout, date: start });
                setWorkouts(workouts.map(workout => (workout._id === id ? response.data : workout)));
                handleModalClose();
            } catch (error) {
                console.error('Error moving workout:', error);
                setError('Error moving workout. Please try again.');
            }
        }
    };

    const handleReplicate = async () => {
        const { start } = currentEvent.event;
        const workout = workouts.find(workout => workout._id === currentEvent.event.id);

        if (workout) {
            const newWorkout = {
                ...workout,
                date: start,
                _id: undefined,
            };
            try {
                const response = await axios.post('/workouts', newWorkout);
                setWorkouts([...workouts, response.data]);
                handleModalClose();
            } catch (error) {
                console.error('Error replicating workout:', error);
                setError('Error replicating workout. Please try again.');
            }
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setCurrentEvent(null);
    };

    return (
        <>
            <MyHeader />
            <MyAsideBar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Calendar</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Calendar</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card card-primary">
                                    <div className="card-body p-0">
                                        {loading && <p>Loading...</p>}
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        {!loading && !error && (
                                            <FullCalendar
                                                plugins={[dayGridPlugin, interactionPlugin]}
                                                initialView="dayGridMonth"
                                                events={events}
                                                editable={true}
                                                droppable={true}
                                                headerToolbar={{
                                                    left: 'prev,next today',
                                                    center: 'title',
                                                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                                }}
                                                eventDrop={handleEventDrop}
                                                dateClick={handleEventClick}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Workout Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Do you want to replicate this workout or move it to the new date?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleMove}>
                        Move
                    </Button>
                    <Button variant="success" onClick={handleReplicate}>
                        Replicate
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Date: {selectedDate}</h4>
                    <h5>Nutrition Details:</h5>
                    {nutritionDetails ? (
                        <ul>
                            {nutritionDetails.map((nutrition, index) => (
                                <li key={index}>
                                    {nutrition.meal_type}: {nutrition.foods.map(food => food.name).join(', ')}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No nutrition details found for this date.</p>
                    )}
                    <h5>Workout Details:</h5>
                    {workoutDetails ? (
                        <ul>
                            {workoutDetails.map((workout, index) => (
                                <li key={index}>
                                    {workout.category} - {workout.tags.join(', ')}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No workout details found for this date.</p>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CalendarWorkouts;

