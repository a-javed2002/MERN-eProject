import express from 'express';
import upload from '../config/multerConfig.js';
import { loginController, registerController, logoutController, testController, getAllEmployees,sendOtpController,verifyOtpController,resetPasswordController, updateProfilePicture, updatePassword, addImageToGallery, removeImageFromGallery, uploadProfilePicture, uploadImageToGallery } from '../controllers/authController.js'
import { requireSignIn } from '../middlewares/authMiddleware.js';
// router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', logoutController);
router.get('/test', requireSignIn, testController);
router.get('/emp', getAllEmployees);
// Endpoint to send OTP
router.post('/send-otp', sendOtpController);

// Endpoint to verify OTP
router.post('/verify-otp', verifyOtpController);

// Endpoint to reset password
router.post('/reset-password', resetPasswordController);


router.put('/profile-picture/:userId', updateProfilePicture);
router.put('/password/:userId', updatePassword);
router.post('/gallery/:userId', addImageToGallery);
router.delete('/gallery/:userId/:imageUrl', removeImageFromGallery);

// Routes for image uploads
router.post('/upload/profile-picture/:userId', upload.single('profile_picture'), uploadProfilePicture);
router.post('/upload/gallery/:userId', upload.single('image'), uploadImageToGallery);

export default router;