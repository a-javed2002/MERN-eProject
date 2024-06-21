import UserModel from '../models/UserModel.js';
import nodemailer from 'nodemailer';

// Create a new user
export const createUser = async (req, res) => {
    try {
        const user = new UserModel(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get a user by ID
export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
            .populate('basic_info')
            .populate('workout_routines')
            .populate('progress_logs')
            .populate('nutrition_logs');
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a user by ID
export const updateUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find()
            .populate('basic_info')
            .populate('workout_routines')
            .populate('progress_logs')
            .populate('nutrition_logs');

        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};


// Delete a user by ID
export const deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateBasicInfo = async (req, res) => {
    const userId = req.params.userId;
    const { gender, age, height, weight } = req.body;

    // Basic validation for incoming data
    if (!gender || !age || !height || !weight) {
        return res.status(400).json({ message: 'All fields are required: gender, age, height, weight' });
    }

    try {
        // Find the user first
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.basic_info) {
            user.basic_info = [];
        }

        // Update the basic_info field
        user.basic_info = {
            gender,
            age,
            height,
            weight
        };

        // Save the updated user
        await user.save();

        res.json({ message: 'Basic info updated', user });
    } catch (error) {
        console.error(error);

        // Check for specific errors and send appropriate responses
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', details: error.message });
        }

        res.status(500).json({ message: 'Server error' });
    }
};

// Function to handle image upload
export const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    res.status(200).json({
        message: 'File uploaded successfully',
        filePath: req.file.path
    });
};

// Function to update the profile picture path
export const updateProfilePicture = async (req, res) => {
    const userId = req.params.userId;
    const { filePath } = req.body;

    if (!filePath) {
        return res.status(400).json({ message: 'File path is required' });
    }

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove the old profile picture if it exists and is not the default
        if (user.profile_picture !== 'default_profile.jpg') {
            fs.unlink(path.resolve(user.profile_picture), (err) => {
                if (err) console.error(err);
            });
        }

        user.profile_picture = filePath;
        await user.save();

        res.json({ message: 'Profile picture updated', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const storeImages = async (req, res) => {
    const { userId, category, imageUrls } = req.body;

    try {
        // Find the user by userId
        const user = await UserModel.findById(userId);

        // If the user is not found, return an error
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the category already exists
        if (user.images_by_category.has(category)) {
            // If category exists, append the imageUrls to the existing category
            const existingImages = user.images_by_category.get(category);
            user.images_by_category.set(category, [...existingImages, ...imageUrls]);
        } else {
            // If category does not exist, create the category and set the imageUrls
            user.images_by_category.set(category, imageUrls);
        }

        // Save the user document
        await user.save();

        return res.status(200).json({ message: 'Image data stored successfully' });
    } catch (error) {
        console.error('Error storing image data:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const sendEmail = async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Use your email service provider
        auth: {
            user: 'abdjav2002@gmail.com',
            pass: 'julz hrkl vvpr apiu'
        }
    });

    try {
        // Define email options
        const mailOptions = {
            from: email, // Sender's email address
            to: 'abdjav2002@gmail.com', // Receiver's email address
            subject: subject,
            text: `From: ${name} <${email}>\nSubject: ${subject}\nMessage: ${message}`
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to abdjav2002@gmail.com: ${subject}`);

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
};