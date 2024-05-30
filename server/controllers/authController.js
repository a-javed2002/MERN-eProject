import userModel from "../models/UserModel.js";
import TokenModel from "../models/TokenModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import { sendOtpEmail } from './../helpers/emailHelper.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

let tempTokens = {};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const registerController = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;
    // Validations
    if (!name) {  
      return res.status(400).send({ error: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ error: "Password is required" });
    }
    if (!username) {
      return res.status(400).send({ error: "Username is required" });
    }

    // Check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({ success: false, message: "Already Registered, Please login" });
    }

    // Register user
    const hashPass = await hashPassword(password);
    const defaultProfilePicture = 'default_profile.jpg';

    // Save user
    const user = await new userModel({
      name,
      email,
      username,
      password: hashPass,
      profile_picture: defaultProfilePicture,
      basic_info: {},  // Assuming basic_info is required but can be empty initially
      workout_routines: [],
      nutrition_logs: [],
      progress_logs: []
    }).save();

    res.status(200).send({ success: true, message: "User Registered Successfully", user });
  } catch (error) {
    console.log(`Error In registerController ${error}`);
    res.status(500).send({ success: false, message: "Error In Register Controller", error });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password, fcmToken } = req.body;

    // Validation
    if (!email || !password || !fcmToken) {
      return res.status(400).send({ success: false, message: "Invalid Email, Password, or FCM Token" });
    }

    // Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ success: false, message: "Email is not registered" });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({ success: false, message: "Invalid Password" });
    }

    // Check if the FCM token already exists
    const existingTokenIndex = user.fcmTokens.findIndex(tokenObj => tokenObj.token === fcmToken);

    if (existingTokenIndex !== -1) {
      // If token exists, update its loginTime
      user.fcmTokens[existingTokenIndex].loginTime = new Date();
    } else {
      // If token doesn't exist, append it to the array
      user.fcmTokens.push({ token: fcmToken });
    }

    // Save the updated user document
    await user.save();

    // Generate JWT
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Save the JWT in the Token collection
    const tokenDocument = new TokenModel({ token });
    await tokenDocument.save();

    res.status(200).send({
      success: true,
      message: "Login Successful",
      user: {
        name: user.name,
        email: user.email,
        username: user.username,
        profile_picture: user.profile_picture
      },
      token
    });
  } catch (error) {
    console.log(`Error In loginController: ${error}`);
    res.status(500).send({ success: false, message: "Error In Login Controller", error });
  }
};


export const logoutController = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // Remove token from database
    const deletedToken = await TokenModel.findOneAndDelete({ token });

    if (!deletedToken) {
      return res.status(404).send({ success: false, message: "Token not found" });
    }

    res.status(200).send({ success: true, message: "Logout Successful" });
  } catch (error) {
    console.log(`Error In logoutController ${error}`);
    res.status(500).send({ success: false, message: "Error In Logout Controller", error });
  }
};


export const testController = (req, res) => {
  console.log("Protected Route");
  res.send("<h1>Protected Route</h1>");
};

export const getAllEmployees = async (req, res) => {
  try {
    // Fetch all employees using the all() method of userModel
    const allEmployees = await userModel.find({});

    // Send the response with the list of employees
    res.status(200).json(allEmployees);
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const sendOtpController = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Generate a random OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // Save the OTP temporarily
//     tempTokens[email] = { otp, createdAt: Date.now() };

//     // Send the OTP email
//     await sendOtpEmail(email, otp);

//     res.status(200).send({ success: true, message: 'OTP sent to email' });
//   } catch (error) {
//     console.log(`Error in send-otp: ${error}`);
//     res.status(500).send({ success: false, message: 'Internal Server Error' });
//   }
// };

export const sendOtpController = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email exists
    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(404).send({ success: false, message: 'Email not found' });
    }

    // Generate a random OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save the OTP temporarily
    tempTokens[email] = { otp, createdAt: Date.now() };

    // Send the OTP email
    await sendOtpEmail(email, otp);

    res.status(200).send({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    console.log(`Error in send-otp: ${error}`);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

export const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!tempTokens[email] || tempTokens[email].otp !== otp) {
      return res.status(400).send({ success: false, message: 'Invalid or expired OTP' });
    }

    // OTP is valid
    res.status(200).send({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.log(`Error in verify-otp: ${error}`);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!tempTokens[email]) {
      return res.status(400).send({ success: false, message: 'OTP verification required' });
    }

    // Update the user's password
    const hashedPassword = await hashPassword(newPassword);
    await userModel.updateOne({ email }, { password: hashedPassword });

    // Remove the used OTP
    delete tempTokens[email];

    res.status(200).send({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.log(`Error in reset-password: ${error}`);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

//more.....
// Update Profile Picture
export const updateProfilePicture = async (req, res) => {
  try {
    const { userId } = req.params;
    const { profile_picture } = req.body;

    if (!profile_picture) {
      return res.status(400).send({ error: "Profile picture URL is required" });
    }

    const user = await userModel.findByIdAndUpdate(userId, { profile_picture }, { new: true });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send({ success: true, message: "Profile picture updated successfully", user });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error updating profile picture", error });
  }
};

// Update Password
export const updatePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).send({ error: "Old and new passwords are required" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Incorrect old password" });
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error updating password", error });
  }
};

// Add Image to Gallery
export const addImageToGallery = async (req, res) => {
  try {
    const { userId } = req.params;
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).send({ error: "Image URL is required" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    user.gallery = user.gallery || [];
    user.gallery.push(imageUrl);
    await user.save();

    res.status(200).send({ success: true, message: "Image added to gallery successfully", gallery: user.gallery });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error adding image to gallery", error });
  }
};

// Upload Profile Picture
export const uploadProfilePicture = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile_picture = req.file.path; // Get the path of the uploaded file

    const user = await userModel.findByIdAndUpdate(userId, { profile_picture }, { new: true });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send({ success: true, message: "Profile picture uploaded successfully", user });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error uploading profile picture", error });
  }
};

// Add Image to Gallery
export const uploadImageToGallery = async (req, res) => {
  try {
    const { userId } = req.params;
    const imageUrl = req.file.path; // Get the path of the uploaded file

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    user.gallery = user.gallery || [];
    user.gallery.push(imageUrl);
    await user.save();

    res.status(200).send({ success: true, message: "Image uploaded to gallery successfully", gallery: user.gallery });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error uploading image to gallery", error });
  }
};

// Remove Specific Image from Gallery
export const removeImageFromGallery = async (req, res) => {
  try {
    const { userId, imageUrl } = req.params;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    // Find the image in the gallery
    const imageIndex = user.gallery.indexOf(imageUrl);
    if (imageIndex === -1) {
      return res.status(404).send({ success: false, message: "Image not found in gallery" });
    }

    // Remove the image from the gallery array
    user.gallery.splice(imageIndex, 1);
    await user.save();

    // Delete the image file from the server
    const imagePath = path.join(__dirname, '../', imageUrl);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ success: false, message: "Error deleting image file" });
      }
      res.status(200).send({ success: true, message: "Image removed successfully", gallery: user.gallery });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal Server Error", error });
  }
};