import JWT from 'jsonwebtoken';
import colors from 'colors';
import userModel from '../models/UserModel.js';
import TokenModel from "../models/TokenModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // Check if token is blacklisted
    const tokenInBlacklist = await TokenModel.findOne({ token });
    if (tokenInBlacklist) {
      return res.status(401).send({ success: false, message: "Token is invalid" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.log(`Error in requireSignIn middleware ${error}`);
    res.status(401).send({ success: false, message: "Unauthorized" });
  }
};

export const isAdmin = async (req,res,next) => {
    try {
        const user = await userModel.findById(req.body.id)
        if(user.role != 1){
            res.status(401).send({success:false,message:"Unauthorized Access"});
        }
        else{
            next();
        }
    } catch (error) {
        console.log(`Error In is Admin ${error}`.bgRed.white);
        res.status(401).send({success:false,message:"Error In is Admin",error});
    }
};