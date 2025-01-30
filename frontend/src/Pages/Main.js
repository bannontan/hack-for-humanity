import React from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";

const Main = () => {
	const navigate = useNavigate();

	const handleLoginClick = () => {
		navigate("/login");
	};

	const handleSkipClick = () => {
		navigate("/home");
	};

	return (
		<div className="main-page">
			<div className="logo-container">
          		<img src="Logo.png" alt="App Logo" className="app-logo" />
      		</div>
			<h1>Disaster Relief App</h1>
			<p className="subtitle">
				Connecting Communities, Empowering Responses
			</p>
			<div className="buttons">
				<button onClick={handleLoginClick} className="login-button">
					Login
				</button>
				<button onClick={handleSkipClick} className="skip-button">
					Guest
				</button>
			</div>
		</div>
	);
};

export default Main;
