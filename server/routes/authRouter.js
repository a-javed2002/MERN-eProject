import express from 'express';
import { loginController, registerController, logoutController, testController, getAllEmployees,sendOtpController,verifyOtpController,resetPasswordController } from '../controllers/authController.js'
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

export default router;