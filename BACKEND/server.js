import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import path from 'path';
import { fileURLToPath } from 'url'; // <-- Add this
import { dirname } from 'path';      // <-- Add this

// Reconstruct __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// import ImageUploadRouter from './routes/imageUploadRoute.js'; // Import the new route

//yasindu's code
import UserRouter from './routes/UserRoute.js';
import AdminRouter from './routes/AdminRoute.js';
import MoodLogRouter from './routes/Mood_tracking_Route.js'
import SuggesionRouter from './routes/SuggesionsRoute.js';

//Activity Tracking
import ActivityTrackingRoute from './routes/ActivityTrackingRoute.js'


// Mood Journaling
import MoodJournaling from "./routes/MoodJournalingRoute.js";

//Resource Management
import ResourceManagement from "./routes/ResourceManagementRoute.js";


const app = express();
const PORT = process.env.PORT || 8070;

// Middlewares
app.use(express.json()); // Fix for the deprecated use of json() from express
app.use(cors({

    origin:  [process.env.CLIENT_URL || "http://localhost:5173", "http://localhost:5174"],

    credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use("/uploads", express.static("uploads"));

const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Mongodb Connection success!"))
    .catch((err) => console.error("Mongodb connection error:", err));

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb connection is open!");
});

// Routes
// app.use("/api/routeName", Router);

//yasindu's code
app.use('/user', UserRouter);
app.use('/admin', AdminRouter);
app.use('/mood', MoodLogRouter);
app.use('/suggestions', SuggesionRouter);

app.use("/api/mood_journaling", MoodJournaling);


//Oshi
app.use("/api/activity_tracking", ActivityTrackingRoute);

app.use("/api/resource_management", ResourceManagement);

// Add this below your existing routes
// app.use('/api/image', ImageUploadRouter);


app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



