import express from "express";
import dotenv from "dotenv";
import { createUsersDb } from "./utils/db/usersDb.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Users database
createUsersDb();

app.get("/", (req, res, next) => {
	res.send("Hello World");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
