import express from 'express';
import { googleAuthCallback, initiateGoogleAuth } from '../controllers/googleController.js';
import passport from 'passport';

const router = express.Router();

// Route to initiate Google OAuth login
router.get('/auth/google', initiateGoogleAuth);

// Google OAuth callback route
router.get('/auth/google/callback', googleAuthCallback);

export default router;
