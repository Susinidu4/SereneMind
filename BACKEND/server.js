import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();



//yasindu's code
import UserRouter from './routes/UserRoute.js';
import AdminRouter from './routes/AdminRoute.js';
import MoodLogRouter from './routes/Mood_tracking_Route.js'
import SuggesionRouter from './routes/SuggesionsRoute.js';



// Import Routes
import MoodJournaling from "./routes/MoodJournalingRoute.js";


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



app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
