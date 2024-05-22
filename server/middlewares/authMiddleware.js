import JWT from 'jsonwebtoken';
import colors from 'colors';
import User from '../models/User.js';

//Protected Routes token base
export const requireSignIn = (req,res,next) => {
    try {
        const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user=decode;
    } catch (error) {
        console.log(`Error In Require Sign In ${error}`.bgRed.white);
        res.status(401).send({success:false,message:"Error In Require Sign In",error})
    }
};

export const isAdmin = async (req,res,next) => {
    try {
        const user = await User.findById(req.body.id)
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