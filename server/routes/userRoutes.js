import express from 'express';
import { createUser, getUser, updateUser, deleteUser,getAllUsers,updateBasicInfo,uploadImage,updateProfilePicture,storeImages } from '../controllers/userController.js';
const router = express.Router();
import upload from '../config/multerConfig.js';

// Create a new user
router.post('/', createUser);

// Get all users
router.get('/', getAllUsers);

// Get a user by ID
router.get('/:id', getUser);

// Update a user by ID
router.put('/:id', updateUser);

// Delete a user by ID
router.delete('/:id', deleteUser);

router.put('/:userId/basic-info', updateBasicInfo);

router.post('/upload', upload.single('image'), uploadImage);
router.put('/users/:userId/profile-picture', updateProfilePicture);
router.put('/users/:userId/gallery', storeImages);

export default router;
