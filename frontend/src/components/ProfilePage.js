import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';

const ProfilePage = ({ userId }) => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');
    const [loading, setLoading] = useState(false);

    userId = "665612cf2d30a599cfd3b805";

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setMessage('Please select a file');
            setVariant('warning');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            setLoading(true);
            // Upload image
            const uploadResponse = await axios.post('http://localhost:8080/api/v1/users/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const { filePath } = uploadResponse.data;

            // Update profile picture path
            await axios.put(`http://localhost:8080/api/v1/users/users/${userId}/profile-picture`, { filePath });

            setMessage('Profile picture updated successfully');
            setVariant('success');
            setFile(null);
        } catch (error) {
            console.error(error);
            setMessage('Failed to update profile picture');
            setVariant('danger');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="6">
                    <h2 className="text-center my-4">Update Profile Picture</h2>
                    {message && <Alert variant={variant}>{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formFile">
                            <Form.Label>Choose an image</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit" block disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : 'Upload and Update'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;
