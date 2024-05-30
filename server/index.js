import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import morgan from 'morgan';
import passport from 'passport';
import authRoutes from './routes/authRouter.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import nutritionLogRoutes from './routes/nutritionLogRoutes.js';
import progressLogRoutes from './routes/progressLogRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import preferenceRoutes from './routes/preferenceRoutes.js';
import supportRoutes from './routes/supportRoutes.js';
import dashboardRoutes  from './routes/dashboardRoutes.js';
import googleRoutes  from './routes/googleRouter.js';

//configure env
dotenv.config();

//rest object
const app = express();

// Initialize passport
app.use(passport.initialize());

// Convert `import.meta.url` to `__dirname`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//database connection   https://chatgpt.com/c/00ba90c6-1ad5-4e45-a562-3653fc4c4bc6
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/workouts', workoutRoutes);
app.use('/api/v1/nutrition-logs', nutritionLogRoutes);
app.use('/api/v1/progress-logs', progressLogRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/preferences', preferenceRoutes);
app.use('/api/v1/support', supportRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use(googleRoutes);

//rest api
app.get('/',(req,res)=>{
    res.send("<h1>Welcome To Gym Freak</h1>");
    // res.send({
    //     message: "Welcome To Ecommerce App"
    // });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server Running On ${process.env.DEV_MODE} mode and on ${PORT} Port`.bgCyan.white);
})