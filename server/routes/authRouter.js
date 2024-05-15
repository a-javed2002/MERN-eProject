import express from 'express';
import {loginController, registerController,logoutController, testController,getAllEmployees} from '../controllers/authController.js'
import { requireSignIn } from '../middlewares/authMiddleware.js';
// router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post('/register',registerController);
router.post('/login',loginController);
router.post('/logout', logoutController);
router.get('/test',requireSignIn,testController);
router.get('/emp',getAllEmployees);

export default router;