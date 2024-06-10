import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchInput from 'react-search-input';

const SearchPage = () => {
    const [users, setUsers] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [progress, setProgress] = useState([]);
    const [nutrition, setNutrition] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get('http://localhost:8080/api/v1/users');
                setUsers(usersResponse.data);

                const workoutsResponse = await axios.get('http://localhost:8080/api/v1/workouts');
                setWorkouts(workoutsResponse.data);

                const progressResponse = await axios.get('http://localhost:8080/api/v1/progress');
                setProgress(progressResponse.data);

                const nutritionResponse = await axios.get('http://localhost:8080/api/v1/nutritions');
                setNutrition(nutritionResponse.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    // Function to handle search
    // Function to handle search
    const handleSearch = (query) => {
        setSearchQuery(query);

        // Filter data based on search query
        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(query.toLowerCase())
        );
        const filteredWorkouts = workouts.filter(workout =>
            workout.name.toLowerCase().includes(query.toLowerCase())
        );
        const filteredProgress = progress.filter(item =>
            item.type.toLowerCase().includes(query.toLowerCase())
        );
        const filteredNutrition = nutrition.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredResults({
            users: filteredUsers,
            workouts: filteredWorkouts,
            progress: filteredProgress,
            nutrition: filteredNutrition,
        });
    };

    // Function to navigate to different components based on category
    const navigateToDetail = (category, id) => {
        switch (category) {
            case 'user':
                navigate(`/user/${id}`);
                break;
            case 'workout':
                navigate(`/workout/${id}`);
                break;
            case 'progress':
                navigate(`/progress/${id}`);
                break;
            case 'nutrition':
                navigate(`/nutrition/${id}`);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <h1>Advanced Search</h1>
            <SearchInput
                className="search-input"
                onChange={handleSearch}
                placeholder="Search..."
            />

            {/* Render filtered results */}
            {/* Users */}
            <div>
                <h2>Users</h2>
                {filteredResults.users.map(user => (
                    <div key={user.id} onClick={() => navigateToDetail('user', user.id)}>
                        <p>{user.name}</p>
                        {/* Render other user details */}
                    </div>
                ))}
            </div>

            {/* Workouts */}
            <div>
                <h2>Workouts</h2>
                {filteredResults.workouts.map(workout => (
                    <div key={workout.id} onClick={() => navigateToDetail('workout', workout.id)}>
                        <p>{workout.name}</p>
                        {/* Render other workout details */}
                    </div>
                ))}
            </div>

            {/* Progress */}
            <div>
                <h2>Progress</h2>
                {filteredResults.progress.map(item => (
                    <div key={item.id} onClick={() => navigateToDetail('progress', item.id)}>
                        <p>{item.type}</p>
                        {/* Render other progress details */}
                    </div>
                ))}
            </div>

            {/* Nutrition */}
            <div>
                <h2>Nutrition</h2>
                {filteredResults.nutrition.map(item => (
                    <div key={item.id} onClick={() => navigateToDetail('nutrition', item.id)}>
                        <p>{item.name}</p>
                        {/* Render other nutrition details */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
