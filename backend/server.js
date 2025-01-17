import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import { fileURLToPath } from "url"; // utility to help with file paths
import path from "path"; // utility to help with file paths

import authUser from "./routes/authUser.js";
import map from "./routes/map.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import { authenticate } from "./middlewares/authenticationMiddleware.js";
import "./utils/db/init.js"; // Initializes Sequelize models and associations

// import initMap from "./views/js/main.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Getting relative path to load google maps API for testing
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the view engine to EJS
app.set("view engine", "ejs");

// Specify the directory for EJS templates (default is `views`)
app.set("views", "./views");

app.use(
	session({
		secret: process.env.JWT_SECRET, // Use a secure secret key
		resave: false, // Avoid saving unchanged sessions
		saveUninitialized: true, // Save uninitialized sessions
		cookie: { secure: false }, // Use `true` in production with HTTPS
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Set a static folder
app.use(express.static(path.join(__dirname, "views"))); // Serve JS files

// API endpoint to provide map data
app.get('/api/map-data', (req, res) => {
    res.json({
        apiKey: process.env.GOOGLE_MAPS_API_KEY, // Use environment variables for security
        location: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
});

app.get("/map", (req, res, next) => {
	res.render("map");
});

app.get("/login", (req, res, next) => {
	res.render("login");
});

// Routes to login and signup
app.use("/user", authUser);

app.use("/map", map);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
