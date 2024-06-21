import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
import {
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Card,
    CardContent,
    Typography,
    Grid,
    List,
    ListItem,
    ListItemText,
    Paper,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';
import { FaRunning, FaDumbbell, FaAppleAlt, FaBurn } from 'react-icons/fa';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
} from 'chart.js';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import MyAsideBar from './Main/aside';
import MyHeader from './Main/header';

// Register the necessary elements with Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
);

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const CardStyled = styled(Card)`
  background-color: #f5f5f5;
  animation: ${fadeIn} 1s ease-in-out;
`;

const PageContainer = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #ececec, #ffffff);
  min-height: 100vh;
`;

const TodoList = styled.div`
  margin-top: 20px;
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MyDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [progressFilter, setProgressFilter] = useState('overall');
    const [nutritionFilter, setNutritionFilter] = useState('overall');
    const [workoutFilter, setWorkoutFilter] = useState('overall');
    const userId = "665612cf2d30a599cfd3b805";

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/users/${userId}`);
                setUserData(response.data);
            } catch (error) {
                setError("Failed to load user data");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleWorkoutClick = (workout) => {
        setSelectedWorkout(workout);
    };

    const handleClose = () => {
        setSelectedWorkout(null);
    };

    const handleFilterChange = (event) => {
        setProgressFilter(event.target.value);
    };

    const filterProgressData = () => {
        if (!userData?.progress_logs) return { labels: [], datasets: [] };

        const now = dayjs();
        let filteredLogs = [];

        switch (progressFilter) {
            case 'week':
                filteredLogs = userData.progress_logs.filter(log =>
                    dayjs(log.date).isAfter(now.subtract(1, 'week'))
                );
                break;
            case 'month':
                filteredLogs = userData.progress_logs.filter(log =>
                    dayjs(log.date).isAfter(now.subtract(1, 'month'))
                );
                break;
            case 'year':
                filteredLogs = userData.progress_logs.filter(log =>
                    dayjs(log.date).isAfter(now.subtract(1, 'year'))
                );
                break;
            case 'overall':
            default:
                filteredLogs = userData.progress_logs;
                break;
        }

        const labels = filteredLogs.map(log => dayjs(log.date).format('YYYY-MM-DD'));
        const chestData = filteredLogs.map(log => log.body_measurements.chest);
        const waistData = filteredLogs.map(log => log.body_measurements.waist);
        const hipsData = filteredLogs.map(log => log.body_measurements.hips);

        return {
            labels,
            datasets: [
                {
                    label: 'Chest',
                    data: chestData,
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                },
                {
                    label: 'Waist',
                    data: waistData,
                    fill: false,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                },
                {
                    label: 'Hips',
                    data: hipsData,
                    fill: false,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                },
            ]
        };
    };


    if (loading) {
        return (
            <PageContainer>
                <CircularProgress />
            </PageContainer>
        );
    }

    if (error) {
        return (
            <PageContainer>
                <Typography variant="h6" color="error">{error}</Typography>
            </PageContainer>
        );
    }

    const getNutritionData = () => {
        if (!userData?.nutrition_logs) return { labels: [], datasets: [] };

        const filteredLogs = filterLogsByDate(userData.nutrition_logs);

        const macros = filteredLogs[0]?.foods[0]?.macros || { protein: 0, carbs: 0, fat: 0 };

        return {
            labels: ['Protein', 'Carbs', 'Fats'],
            datasets: [
                {
                    label: 'Nutrition Intake',
                    backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
                    data: [macros.protein, macros.carbs, macros.fat]
                }
            ]
        };
    };

    const filterLogsByDate = (logs) => {
        if (!logs) return [];
        const now = dayjs();

        switch (nutritionFilter) {
            case 'week':
                return logs.filter(log => dayjs(log.date).isAfter(now.subtract(1, 'week')));
            case 'month':
                return logs.filter(log => dayjs(log.date).isAfter(now.subtract(1, 'month')));
            case 'year':
                return logs.filter(log => dayjs(log.date).isAfter(now.subtract(1, 'year')));
            case 'overall':
            default:
                return logs;
        }
    };


    const getWorkoutData = () => {
        if (!userData?.workout_routines) return { labels: [], datasets: [] };

        const filteredRoutines = filterRoutinesByDate(userData.workout_routines);

        const workoutDurations = filteredRoutines.map(routine => routine.exercises[0]?.weights || 0);
        const workoutCategories = filteredRoutines.map(routine => routine.category);

        return {
            labels: workoutCategories || [],
            datasets: [
                {
                    label: 'Workout Duration (mins)',
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(75,192,192,0.8)',
                    hoverBorderColor: 'rgba(75,192,192,1)',
                    data: workoutDurations || []
                }
            ]
        };
    };

    const filterRoutinesByDate = (routines) => {
        if (!routines) return [];
        const now = dayjs();

        switch (workoutFilter) {
            case 'week':
                return routines.filter(routine => dayjs(routine.date).isAfter(now.subtract(1, 'week')));
            case 'month':
                return routines.filter(routine => dayjs(routine.date).isAfter(now.subtract(1, 'month')));
            case 'year':
                return routines.filter(routine => dayjs(routine.date).isAfter(now.subtract(1, 'year')));
            case 'overall':
            default:
                return routines;
        }
    };


    const getProgressData = () => {
        if (!userData || !userData.progress_logs.length) return null;

        const measurements = userData.progress_logs[0]?.body_measurements || { chest: 0, waist: 0, hips: 0 };

        return {
            labels: ['Chest', 'Waist', 'Hips'],
            datasets: [
                {
                    label: 'Body Measurements',
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255, 99, 132, 0.8)',
                    hoverBorderColor: 'rgba(255, 99, 132, 1)',
                    data: [measurements.chest, measurements.waist, measurements.hips]
                }
            ]
        };
    };

    const calculateTotalWorkouts = () => {
        return userData?.workout_routines.length || 0;
    };

    const calculateTotalCaloriesBurned = () => {
        if (!userData || !userData.workout_routines.length) return 0;

        return userData.workout_routines.reduce((total, routine) => total + (routine.exercises[0]?.weights || 0) * 10, 0);
    };

    const calculateTotalCaloriesGained = () => {
        if (!userData || !userData.nutrition_logs.length) return 0;

        return userData.nutrition_logs.reduce((total, log) => total + log.foods.reduce((subTotal, food) => subTotal + food.calories, 0), 0);
    };

    const handleNutritionFilterChange = (event) => {
        setNutritionFilter(event.target.value);
    };

    const handleWorkoutFilterChange = (event) => {
        setWorkoutFilter(event.target.value);
    };

    if (loading) {
        return (
            <PageContainer>
                <CircularProgress />
            </PageContainer>
        );
    }

    if (error) {
        return (
            <PageContainer>
                <Typography variant="h6" color="error">{error}</Typography>
            </PageContainer>
        );
    }

    const nutritionData = getNutritionData();
    const workoutData = getWorkoutData();
    const progressData = getProgressData();

    return (
        <>

            <MyHeader />
            <MyAsideBar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
            <PageContainer>
                {/* <h1>MyDashboard</h1> */}
                {userData && (
                    <div>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3}>
                                <CardStyled>
                                    <CardContent>
                                        <Typography variant="h5">
                                            <FaRunning /> Total Workouts
                                        </Typography>
                                        <Typography variant="h4">
                                            {calculateTotalWorkouts()}
                                        </Typography>
                                    </CardContent>
                                </CardStyled>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <CardStyled>
                                    <CardContent>
                                        <Typography variant="h5">
                                            <FaBurn /> Calories Burned
                                        </Typography>
                                        <Typography variant="h4">
                                            {calculateTotalCaloriesBurned()}
                                        </Typography>
                                    </CardContent>
                                </CardStyled>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <CardStyled>
                                    <CardContent>
                                        <Typography variant="h5">
                                            <FaAppleAlt /> Calories Gained
                                        </Typography>
                                        <Typography variant="h4">
                                            {calculateTotalCaloriesGained()}
                                        </Typography>
                                    </CardContent>
                                </CardStyled>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <CardStyled>
                                    <CardContent>
                                        <Typography variant="h5">
                                            <FaDumbbell /> Weight Lifted
                                        </Typography>
                                        <Typography variant="h4">
                                            {userData.progress_logs[0]?.weight || 0} kg
                                        </Typography>
                                    </CardContent>
                                </CardStyled>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} style={{ marginTop: '20px' }}>
                            <Grid item xs={12} md={6}>
                                <CardStyled>
                                    <CardContent>
                                        <Typography variant="h6">Nutrition Logs</Typography>
                                        <FormControl fullWidth style={{ marginBottom: '20px' }}>
                                            <InputLabel>Nutrition Filter</InputLabel>
                                            <Select value={nutritionFilter} onChange={handleNutritionFilterChange}>
                                                <MenuItem value="week">Last Week</MenuItem>
                                                <MenuItem value="month">Last Month</MenuItem>
                                                <MenuItem value="year">Last Year</MenuItem>
                                                <MenuItem value="overall">Overall</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {nutritionData ? <Pie data={nutritionData} /> : <Typography>No nutrition data available</Typography>}
                                    </CardContent>
                                </CardStyled>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CardStyled>
                                    <CardContent>
                                        <Typography variant="h6">Workout Routines</Typography>
                                        <FormControl fullWidth style={{ marginBottom: '20px' }}>
                                            <InputLabel>Workout Filter</InputLabel>
                                            <Select value={workoutFilter} onChange={handleWorkoutFilterChange}>
                                                <MenuItem value="week">Last Week</MenuItem>
                                                <MenuItem value="month">Last Month</MenuItem>
                                                <MenuItem value="year">Last Year</MenuItem>
                                                <MenuItem value="overall">Overall</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {workoutData ? <Bar data={workoutData} /> : <Typography>No workout data available</Typography>}
                                    </CardContent>
                                </CardStyled>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CardStyled>
                                    <CardContent>
                                        <Typography variant="h6">Progress</Typography>
                                        <FormControl fullWidth style={{ marginBottom: '20px' }}>
                                            <InputLabel>Filter Progress</InputLabel>
                                            <Select value={progressFilter} onChange={handleFilterChange}>
                                                <MenuItem value="week">Last Week</MenuItem>
                                                <MenuItem value="month">Last Month</MenuItem>
                                                <MenuItem value="year">Last Year</MenuItem>
                                                <MenuItem value="overall">Overall</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <Line data={filterProgressData()} />
                                    </CardContent>
                                </CardStyled>
                            </Grid>
                        </Grid>

                        <TodoList>
                            <Typography variant="h5">7-Day Workout Plan</Typography>
                            {userData.workout_routines.length > 0 ? (
                                userData.workout_routines.map((routine, index) => (
                                    <Paper key={index} style={{ marginBottom: '10px', padding: '10px' }}>
                                        <Typography variant="h6">Day {index + 1}</Typography>
                                        {routine.exercises.map((exercise, idx) => (
                                            <ListItem button key={idx} onClick={() => handleWorkoutClick(exercise)}>
                                                <ListItemText primary={exercise.name} secondary={`Category: ${routine.category}`} />
                                            </ListItem>
                                        ))}
                                    </Paper>
                                ))
                            ) : (
                                <Typography>No workout routines available</Typography>
                            )}
                        </TodoList>

                        <Dialog open={!!selectedWorkout} onClose={handleClose}>
                            <DialogTitle>Workout Details</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {selectedWorkout && (
                                        <>
                                            <Typography variant="h6">{selectedWorkout.name}</Typography>
                                            <Typography>Weights: {selectedWorkout.weights}</Typography>
                                            <Typography>Reps: {selectedWorkout.reps}</Typography>
                                            <Typography>Sets: {selectedWorkout.sets}</Typography>
                                        </>
                                    )}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">Close</Button>
                            </DialogActions>
                        </Dialog>



                    </div>
                )}
            </PageContainer>
            </div>
            </section>
            </div>
        </>
    );
};

export default MyDashboard;
