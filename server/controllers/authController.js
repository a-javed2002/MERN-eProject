import userModel from "../models/UserModel.js";
import TokenModel from "../models/TokenModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import { sendOtpEmail } from './../helpers/emailHelper.js';

let tempTokens = {};

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
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({ success: false, message: "Invalid Email or Password" });
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

    // Token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Save token to the database
    await new TokenModel({ token }).save();

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
    console.log(`Error In loginController ${error}`);
    res.status(500).send({ success: false, message: "Error In Login Controller", error });
  }
};

export const logoutController = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // Remove token from database
    await TokenModel.findOneAndDelete({ token });

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

export const sendOtpController = async (req, res) => {
  try {
    const { email } = req.body;

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