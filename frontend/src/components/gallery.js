import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, ButtonGroup, Button, Grid, Card, CardMedia, Dialog, DialogContent, DialogTitle, DialogActions, TextField, MenuItem, Input, InputLabel, FormControl, FormHelperText } from '@mui/material';
import { Form, Row, Col, Alert, Spinner } from 'react-bootstrap';

const GalleryComponent = () => {
    const [userData, setUserData] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [newImages, setNewImages] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [fileError, setFileError] = useState('');

    const [file, setFile] = useState(null);
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');
    const userId = "665612cf2d30a599cfd3b805";

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/user'); // Adjust the endpoint as per your backend route
                setUserData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleAddModalOpen = () => {
        setOpenAddModal(true);
    };

    const handleAddModalClose = () => {
        setOpenAddModal(false);
        setNewImages([]);
        setNewCategory('');
        setFileError('');
    };

    const handleImageChange = (event) => {
        const files = event.target.files;
        if (files.length > 3) {
            setFileError('Maximum 3 files allowed');
            return;
        }
        const allowedFormats = ['image/jpeg', 'image/png'];
        for (let i = 0; i < files.length; i++) {
            if (!allowedFormats.includes(files[i].type)) {
                setFileError('Only jpeg and png formats allowed');
                return;
            }
        }
        const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
        setNewImages(imageUrls);
    };

    const handleAddImage = async (e) => {
        e.preventDefault();

        if (!file || !category) {
            setMessage('Please select images and category');
            setVariant('warning');
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < file.length; i++) {
            formData.append('images', file[i]);
        }

        try {
            setLoading(true);
            // Upload images
            const uploadResponse = await axios.post('http://localhost:8080/api/v1/users/upload-images', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const { imageUrls } = uploadResponse.data;

            // Store imageUrls in the database
            await axios.post('http://localhost:8080/api/v1/users/store-images', {
                userId: userId,
                category: category,
                imageUrls: imageUrls
            });

            setMessage('Images uploaded and stored successfully');
            setVariant('success');
            setFile(null);
            setCategory('');
        } catch (error) {
            console.error(error);
            setMessage('Failed to upload and store images');
            setVariant('danger');
        } finally {
            setLoading(false);
        }
    };


    const renderCategoryButtons = () => {
        if (!userData || !userData.images_by_category) {
            return null;
        }
        const categories = ['all', 'biceps', 'triceps', 'chest', 'back', 'legs'];
        return (
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                {categories.map(category => (
                    <Button key={category} onClick={() => handleCategoryChange(category)}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                ))}
            </ButtonGroup>
        );
    };

    const renderGallery = () => {
        if (loading) {
            return <Typography>Loading...</Typography>;
        } else if (!userData || !userData.images_by_category.length) {
            return <Typography>No images available</Typography>;
        } else {
            return (
                <Grid container spacing={2}>
                    {userData.images_by_category.map(image => (
                        <Grid item key={image.imageUrl} xs={6} sm={4} md={3}>
                            <Card onClick={() => handleImageClick(image)}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={image.imageUrl}
                                    alt={image.category}
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            );
        }
    };

    const renderAddModal = () => {
        return (
            <Dialog open={openAddModal} onClose={handleAddModalClose}>
                {message && <Alert variant={variant}>{message}</Alert>}
                <DialogTitle>Add Images</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth error={Boolean(fileError)}>
                        <InputLabel htmlFor="image-upload">Choose Images</InputLabel>
                        <Input
                            id="image-upload"
                            type="file"
                            inputProps={{ multiple: true }}
                            onChange={handleImageChange}
                        />
                        <FormHelperText>{fileError}</FormHelperText>
                    </FormControl>
                    <TextField
                        select
                        label="Category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value="abs">Abs</MenuItem>
                        <MenuItem value="back">Back</MenuItem>
                        <MenuItem value="biceps">Biceps</MenuItem>
                        <MenuItem value="calisthenics">Calisthenics</MenuItem>
                        <MenuItem value="cardio">Cardio</MenuItem>
                        <MenuItem value="chest">Chest</MenuItem>
                        <MenuItem value="core">Core</MenuItem>
                        <MenuItem value="forearms">Forearms</MenuItem>
                        <MenuItem value="glutes">Glutes</MenuItem>
                        <MenuItem value="hamstrings">Hamstrings</MenuItem>
                        <MenuItem value="legs">Legs</MenuItem>
                        <MenuItem value="quads">Quads</MenuItem>
                        <MenuItem value="shoulders">Shoulders</MenuItem>
                        <MenuItem value="triceps">Triceps</MenuItem>
                        <MenuItem value="yoga">Yoga</MenuItem>

                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddModalClose}>Cancel</Button>
                    <Button onClick={handleAddImage} color="primary">Add</Button>
                </DialogActions>
            </Dialog>
        );
    };


    return (
        <Container>
            <Typography variant="h3" gutterBottom>Gallery</Typography>
            {renderCategoryButtons()}
            <Button onClick={handleAddModalOpen}>Add Images</Button>
            {renderGallery()}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{selectedImage?.category}</DialogTitle>
                <DialogContent>
                    <img src={selectedImage?.imageUrl} alt={selectedImage?.category} style={{ maxWidth: '100%' }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Close</Button>
                </DialogActions>
            </Dialog>
            {renderAddModal()}
        </Container>
    );
};

export default GalleryComponent;
