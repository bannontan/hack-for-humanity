import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import { fileURLToPath } from "url"; // utility to help with file paths
import path from "path"; // utility to help with file paths

import authUser from "./routes/authUser.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import { authenticate } from "./middlewares/authenticationMiddleware.js";
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
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views/js"))); // Serve JS files

app.get("/", authenticate, (req, res, next) => {
	res.render("test");
});

app.get("/login", (req, res, next) => {
	res.render("login");
});

// Routes to login and signup
app.use("/user", authUser);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
