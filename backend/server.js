import express from "express";
import dotenv from "dotenv";
import session from "express-session";

import authUser from "./routes/authUser.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import { authenticate } from "./middlewares/authenticationMiddleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

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

app.get("/", authenticate, (req, res, next) => {
	res.send("Hello World");
});

// Routes to login and signup
app.use("/user", authUser);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
