import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const UpdateBasicInfo = ({ userId }) => {
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');  // To set the variant of the alert

    userId = "665612cf2d30a599cfd3b805";

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8080/api/v1/users/${userId}/basic-info`, {
                gender,
                age,
                height,
                weight
            });

            setMessage(response.data.message);
            setVariant('success');
        } catch (error) {
            console.error(error);

            let errorMessage = 'Failed to update basic info';
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }

            setMessage(errorMessage);
            setVariant('danger');
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="6">
                    <h2 className="text-center my-4">Update Basic Info</h2>
                    {message && <Alert variant={variant}>{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="Enter your age"
                                min = "15"
                            />
                        </Form.Group>

                        <Form.Group controlId="formHeight">
                            <Form.Label>Height (cm)</Form.Label>
                            <Form.Control
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                placeholder="Enter your height"
                            />
                        </Form.Group>

                        <Form.Group controlId="formWeight">
                            <Form.Label>Weight (kg)</Form.Label>
                            <Form.Control
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder="Enter your weight"
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" block>
                            Update
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateBasicInfo;
