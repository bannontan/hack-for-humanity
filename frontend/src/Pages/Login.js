import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext"; // Import the context
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import "./Login.css";

const Login = () => {
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [passwordVisible, setPasswordVisible] = useState(false); // State to track password visibility
	const navigate = useNavigate();
	const { setUser } = useUser(); // Access the setUser method

	const handleLogin = async (e) => {
		e.preventDefault();
		if (!id || !password) {
			setErrorMessage("Please enter both ID and password");
			return;
		}

		try {
			const response = await fetch("http://localhost:8080/user/login", {
				method: "POST",
				credentials: "include", // Include cookies
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id, password }),
			});

			if (!response.ok) {
				const { message } = await response.json();
				setErrorMessage(message || "Invalid login credentials");
				return;
			}

			const data = await response.json();
			if (data.bool && data.role === "admin") {
				setUser({
					username: data.username,
					id: data.id,
					age: data.age,
					role: data.role,
				}); // Save the user info in context
				console.log(data);
				navigate("/AdminHome");
			} else {
				console.log(data);
				setUser({
					username: data.username,
					id: data.id,
					age: data.age,
					role: data.role,
				}); // Save the user info in context
				navigate("/home");
			}
		} catch (error) {
			setErrorMessage("An error occurred. Please try again.");
		}
	};

	return (
		<div className="login-page">
			<h1>Login to RE App</h1>
			{errorMessage && <p>{errorMessage}</p>}
			<form onSubmit={handleLogin}>
				<input
					type="text"
					placeholder="Enter your ID"
					value={id}
					onChange={(e) => setId(e.target.value)}
					required
				/>
				<div className="password-container">
					<input
						type={passwordVisible ? "text" : "password"} // Toggle input type based on visibility state
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<span
						className="password-toggle"
						onClick={() => setPasswordVisible(!passwordVisible)} // Toggle the password visibility
					>
						{passwordVisible ? <FaEyeSlash /> : <FaEye />}
					</span>
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
