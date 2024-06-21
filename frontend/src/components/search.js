import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, Form, Container, Row, Col, Tab, Tabs, Card, Modal } from 'react-bootstrap';
import MyHeader from './Main/header';
import MyAsideBar from './Main/aside';

const SearchPage = () => {
    const [users, setUsers] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [progress, setProgress] = useState([]);
    const [nutrition, setNutrition] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [activeFilter, setActiveFilter] = useState('workouts');
    const [modalShow, setModalShow] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [replicateDate, setReplicateDate] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get('http://localhost:8080/api/v1/users');
                setUsers(usersResponse.data);

                const workoutsResponse = await axios.get('http://localhost:8080/api/v1/workouts');
                setWorkouts(workoutsResponse.data);
                setFilteredResults(workoutsResponse.data); // Show workouts by default

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

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        let filteredData = [];
        switch (activeFilter) {
            case 'users':
                filteredData = users.filter(user =>
                    user.name && user.name.toLowerCase().includes(query.toLowerCase())
                );
                break;
            case 'workouts':
                filteredData = workouts.filter(workout =>
                    workout.name && workout.name.toLowerCase().includes(query.toLowerCase())
                );
                break;
            case 'progress':
                filteredData = progress.filter(item =>
                    item.type && item.type.toLowerCase().includes(query.toLowerCase())
                );
                break;
            case 'nutrition':
                filteredData = nutrition.filter(item =>
                    item.name && item.name.toLowerCase().includes(query.toLowerCase())
                );
                break;
            default:
                break;
        }
        setFilteredResults(filteredData);
    };

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setSearchQuery('');
        let filteredData = [];
        switch (filter) {
            case 'users':
                filteredData = users;
                break;
            case 'workouts':
                filteredData = workouts;
                break;
            case 'progress':
                filteredData = progress;
                break;
            case 'nutrition':
                filteredData = nutrition;
                break;
            default:
                break;
        }
        setFilteredResults(filteredData);
    };

    const navigateToDetail = (category, id) => {
        switch (category) {
            case 'user':
                navigate(`/profile/${id}`);
                break;
            case 'workout':
                // Open modal instead of navigating directly
                const selected = workouts.find(workout => workout.id === id);
                setSelectedWorkout(selected);
                setModalShow(true);
                break;
            case 'progress':
                // navigate(`/progress/${id}`);
                break;
            case 'nutrition':
                // navigate(`/nutrition/${id}`);
                break;
            default:
                break;
        }
    };

    const handleReplicate = async () => {
        if (!selectedWorkout) return;

        const newWorkout = {
            ...selectedWorkout,
            date: replicateDate, // Use the date selected by the user
            _id: undefined, // Remove _id to create a new workout
        };

        try {
            const response = await axios.post('/workouts', newWorkout);
            setWorkouts([...workouts, response.data]);
            handleModalClose();
        } catch (error) {
            console.error('Error replicating workout:', error);
            setError('Error replicating workout. Please try again.');
        }
    };

    const handleModalClose = () => {
        setModalShow(false);
        setSelectedWorkout(null);
        setReplicateDate('');
        setError('');
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
                            <Container>
            <h1>Advanced Search</h1>
            <Row className="mb-3">
                <Col xs={8}>
                    <Form.Control
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </Col>
                <Col xs={4}>
                    <ButtonGroup>
                        <Button
                            variant={activeFilter === 'users' ? 'primary' : 'outline-primary'}
                            onClick={() => handleFilterChange('users')}
                        >
                            Users
                        </Button>
                        <Button
                            variant={activeFilter === 'workouts' ? 'primary' : 'outline-primary'}
                            onClick={() => handleFilterChange('workouts')}
                        >
                            Workouts
                        </Button>
                        <Button
                            variant={activeFilter === 'progress' ? 'primary' : 'outline-primary'}
                            onClick={() => handleFilterChange('progress')}
                        >
                            Progress
                        </Button>
                        <Button
                            variant={activeFilter === 'nutrition' ? 'primary' : 'outline-primary'}
                            onClick={() => handleFilterChange('nutrition')}
                        >
                            Nutrition
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>

            <Modal show={modalShow} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Replicate Workout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Do you want to replicate this workout?</p>
                    <p><strong>Name:</strong> {selectedWorkout?.name}</p>
                    <Form.Group controlId="replicateDate">
                        <Form.Label>Select Date:</Form.Label>
                        <Form.Control
                            type="date"
                            value={replicateDate}
                            onChange={(e) => setReplicateDate(e.target.value)}
                        />
                    </Form.Group>
                    {error && <div className="text-danger">{error}</div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleReplicate}>
                        Replicate
                    </Button>
                </Modal.Footer>
            </Modal>

            <Tabs activeKey={activeFilter} onSelect={(filter) => handleFilterChange(filter)}>
                <Tab eventKey="users" title="Users">
                    <div>
                        {filteredResults && filteredResults.map(user => (
                            <Card className="mb-3" key={user.id} onClick={() => navigateToDetail('user', user.id)}>
                                <Card.Body>
                                    <Card.Title>{user.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Email:</strong> {user.email}<br />
                                        <strong>Age:</strong> {user.age}<br />
                                        <strong>Gender:</strong> {user.gender}<br />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </Tab>
                <Tab eventKey="workouts" title="Workouts">
                    <div>
                        {filteredResults && filteredResults.map(workout => (
                            <Card className="mb-3" key={workout.id} onClick={() => navigateToDetail('workout', workout.id)}>
                                <Card.Body>
                                    <Card.Title>{workout.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Category:</strong> {workout.category}<br />
                                        <strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}<br />
                                        <strong>Tags:</strong> {workout.tags ? workout.tags.join(', ') : 'No tags'}<br />
                                        <strong>Exercises:</strong>
                                        <ul>
                                            {workout.exercises && workout.exercises.map((exercise, index) => (
                                                <li key={index}>
                                                    {exercise.name} - Sets: {exercise.sets}, Reps: {exercise.reps}, Weights: {exercise.weights}
                                                </li>
                                            ))}
                                        </ul>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </Tab>
                <Tab eventKey="progress" title="Progress">
                    <div>
                        {filteredResults && filteredResults.map(item => (
                            <Card className="mb-3" key={item.id} onClick={() => navigateToDetail('progress', item.id)}>
                                <Card.Body>
                                    <Card.Title>{item.type}</Card.Title>
                                    <Card.Text>
                                        <strong>Date:</strong> {new Date(item.date).toLocaleDateString()}<br />
                                        {/* Add other progress details */}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </Tab>
                <Tab eventKey="nutrition" title="Nutrition">
    <div>
        {filteredResults.map(item => (
            <Card className="mb-3" key={item._id}>
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                        <strong>Category:</strong> {item.category}<br />
                        {/* Add other nutrition details */}
                    </Card.Text>
                </Card.Body>
            </Card>
        ))}
    </div>
</Tab>
</Tabs>
        </Container>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default SearchPage;
