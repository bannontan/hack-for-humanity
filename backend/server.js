import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import { fileURLToPath } from "url"; // utility to help with file paths
import path from "path"; // utility to help with file paths
import cors from "cors";
// import "./utils/db/init.js";

// Import routes
import authUser from "./routes/authUser.js";
import map from "./routes/userHelp.js";
import disaster from "./routes/disaster.js";
import adminPost from "./routes/adminPost.js";

// Import middleware
import errorHandler from "./middlewares/errorMiddleware.js";
import { authenticate } from "./middlewares/authenticationMiddleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Getting relative path to load google maps API for testing
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure CORS
const corsOptions = {
	origin: "http://localhost:3000", // Replace with your frontend's URL
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allowed HTTP methods
	allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
	credentials: true, // Enable sending cookies with CORS requests
};

app.use(cors(corsOptions));

// Set the view engine to EJS
app.set("view engine", "ejs");

// Specify the directory for EJS templates (default is `views`)
app.set("views", "./views");

// Use session middleware to save JWT token
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

app.get("/", (req, res, next) => {
	res.status(200).json(`Server is running on port ${port}`);
});

// Routes to login and signup
app.use("/user", authUser);
app.use("/map", map);
app.use("/disaster", disaster);
app.use("/adminpost", adminPost);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
