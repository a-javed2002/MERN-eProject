import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userModel from '../models/UserModel.js';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Passport Configuration
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find or create user in your database based on the Google profile
      let user = await userModel.findOne({ googleId: profile.id });
      if (!user) {
        user = await new userModel({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          profile_picture: profile.photos[0].value, // Save the profile picture URL
          username: profile.emails[0].value.split('@')[0], // Generate a username from email
          password: '', // Google OAuth doesn't require a password
          basic_info: {}, // Assuming basic_info is required but can be empty initially
          workout_routines: [],
          nutrition_logs: [],
          progress_logs: []
        }).save();
      }
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

// Google OAuth Callback Route
export const googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error during Google authentication', error: err });
    }
    if (!user) {
      return res.status(401).json({ message: 'Google authentication failed' });
    }
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    // Redirect or send token to the frontend
    res.redirect(`/login-success?token=${token}`);
  })(req, res, next);
};

// Route for initiating Google OAuth process
export const initiateGoogleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });
