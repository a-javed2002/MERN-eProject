import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "Email is required" });
    }
    if (!password) {
      return res.send({ error: "Password is required" });
    }
    if (!phone) {
      return res.send({ error: "Phone is required" });
    }
    if (!address) {
      return res.send({ error: "Address is required" });
    }

    //check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .send({ success: true, message: "Already Registered,Please login" });
    }

    //register user
    const hashPass = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      password: hashPass,
      phone,
      address,
    }).save();

    res
      .status(200)
      .send({ success: true, message: "User Registered Successfully", user });
  } catch (error) {
    console.log(`Error In registerController ${error}`.bgRed.white);
    res
      .status(500)
      .send({ success: false, message: "Error In Register Controller", error });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      res
        .status(404)
        .send({ success: false, message: "Invalid Email or Password" });
    }
    //chekc user
    const user = await userModel.findOne({ email });
    if (!user) {
      res
        .status(404)
        .send({ success: false, message: "Email is not registered" });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      res.status(404).send({ success: false, message: "Invalid Password" });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login Successfull",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(`Error In loginController ${error}`.bgRed.white);
    res
      .status(500)
      .send({ success: false, message: "Error In Login Controller", error });
  }
};

export const logoutController = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "Logout successful"
    });
  } catch (error) {
    console.log(`Error In logoutController ${error}`.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Error In Logout Controller",
      error
    });
  }
};

//test controller
export const testController = (req, res) => {
  console.log("Protected Route");
  res.send("<h1>Protected Route</h1>");
};

//emp controller
export const getAllEmployees = async (req, res) => {
  try {
    // Fetch all employees using the all() method of userModel
    const allEmployees = await userModel.find({});

    // Send the response with the list of employees
    res.json(allEmployees);
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
