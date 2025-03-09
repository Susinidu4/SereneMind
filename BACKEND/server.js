const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();


// Load environment variables
config();

const PORT = process.env.PORT || 8070;

// Middlewares
app.use(json());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5174",credentials: true,}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());
app.use(bodyParser.json());

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

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
