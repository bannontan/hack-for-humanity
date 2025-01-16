import express from "express";
import dotenv from "dotenv";
import authUser from "./routes/authUser.js";
import errorHandler from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
	res.send("Hello World");
});

app.use("/user", authUser);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
